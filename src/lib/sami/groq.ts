// Groq AI Service for SAMI

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

// Batas output token. Model ini diatur Groq di angka 1000 OTPM,
// jadi jangan minta lebih dari itu agar tidak kena 429 di muka.
const MAX_TOKENS = 900;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function streamChatCompletion(
  messages: ChatMessage[]
): Promise<ReadableStream<string>> {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await groq.chat.completions.create({
          model: MODEL,
          messages,
          temperature: 0.3,
          max_tokens: 1024,
          top_p: 0.9,
          stream: true,
        });

        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        
        controller.close();
      } catch (error) {
        console.error("Groq API error:", error);
        const errorMessage = "Maaf, SAMI sedang mengalami kendala saat memproses permintaan Anda. Silakan coba lagi beberapa saat.";
        controller.enqueue(encoder.encode(errorMessage));
        controller.close();
      }
    },
  });

  return stream;
}

export async function chatCompletion(
  messages: ChatMessage[],
  attempt: number = 0
): Promise<string> {
  try {
    const response = await groq.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.3,
      max_tokens: MAX_TOKENS,
      top_p: 0.9,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    // Groq bisa melempar 429 (rate limit / output token per minute) saat padat.
    // Coba lagi dengan backoff sebelum menyerah.
    const status = (error as { status?: number })?.status;
    if (status === 429 && attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      return chatCompletion(messages, attempt + 1);
    }

    console.error("Groq API error:", error);
    return "Maaf, SAMI sedang mengalami kendala saat memproses permintaan Anda. Silakan coba lagi beberapa saat.";
  }
}
