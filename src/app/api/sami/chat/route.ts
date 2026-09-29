// SAMI Chat API Route — Non-streaming (reliable JSON)

import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/sami/knowledge";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/sami/prompts";
import { classifyDomain } from "@/lib/sami/classifier";
import { detectNavigationIntent } from "@/lib/sami/navigation";
import { chatCompletion } from "@/lib/sami/groq";

// ─── Rate Limiting ────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

// ─── Types ────────────────────────────────────────────────────────
interface RequestBody {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

// ─── POST Handler ─────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "rate_limited",
          response:
            "SAMI sedang menerima banyak permintaan. Silakan coba kembali beberapa saat lagi.",
          sources: [],
          navigation: null,
        },
        { status: 429 }
      );
    }

    // Parse & validate body
    const body: RequestBody = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "invalid_request", response: "Pesan tidak valid." },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length > 1000) {
      return NextResponse.json(
        {
          error: "invalid_request",
          response: "Pesan terlalu panjang. Maksimal 1000 karakter.",
        },
        { status: 400 }
      );
    }

    // ── Step 1: Domain Classification ─────────────────────────────
    const domain = classifyDomain(trimmedMessage);

    if (domain === "OUT_OF_DOMAIN") {
      return NextResponse.json({
        response:
          "Halo! 😊 Sepertinya pertanyaan Anda belum terkait dengan SAMUDRA Jepara ya.\n\nSaya di sini khusus untuk membantu Anda menemukan **data, layanan, dan informasi seputar Kabupaten Jepara** yang tersedia di platform SAMUDRA.\n\nCoba tanyakan tentang:\n- Data pariwisata, kesehatan, atau ekonomi Jepara\n- Layanan CCTV, E-Ticketing, atau E-Walidata\n- Informasi umum tentang Kabupaten Jepara\n\nAda yang ingin Anda ketahui tentang SAMUDRA?",
        domain: "OUT_OF_DOMAIN",
        sources: [],
        navigation: null,
      });
    }

    // ── Step 2: Knowledge Retrieval ───────────────────────────────
    const knowledgeResults = searchKnowledge(trimmedMessage);
    const context = knowledgeResults
      .map(
        (k) =>
          `[${k.title}]\n${k.content}\nSource: https://samudra.jepara.go.id${k.url}`
      )
      .join("\n\n");

    // ── Step 3: Navigation Detection ──────────────────────────────
    const navigation = detectNavigationIntent(trimmedMessage);

    // ── Step 4: Build Prompt & Call Groq ──────────────────────────
    const userPrompt = buildUserPrompt(trimmedMessage, context, history);

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...history.slice(-6).map((h) => ({
        role: h.role as "user" | "assistant",
        content: h.content,
      })),
      { role: "user" as const, content: userPrompt },
    ];

    const aiResponse = await chatCompletion(messages);

    // ── Step 5: Return JSON Response ──────────────────────────────
    return NextResponse.json({
      response: aiResponse,
      domain,
      sources: knowledgeResults.map((k) => ({
        title: k.title,
        url: `https://samudra.jepara.go.id${k.url}`,
      })),
      navigation,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "server_error",
        response:
          "Maaf, SAMI sedang mengalami kendala saat memproses permintaan Anda. Silakan coba lagi beberapa saat.",
        sources: [],
        navigation: null,
      },
      { status: 500 }
    );
  }
}
