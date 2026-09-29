"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import {
  Sparkles,
  MessageCircle,
  X,
  Minus,
  Send,
  ExternalLink,
  Trash2,
  ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  sources?: Array<{ title: string; url: string }>;
  navigation?: { label: string; url: string; type: string } | null;
}

interface ApiResponse {
  response: string;
  domain: string;
  sources: Array<{ title: string; url: string }>;
  navigation: { label: string; url: string; type: string } | null;
}

// ─── Quick Questions ──────────────────────────────────────────────
const QUICK_QUESTIONS = [
  { text: "Apa itu SAMUDRA?", icon: "🔍" },
  { text: "Layanan apa saja yang tersedia?", icon: "⚙️" },
  { text: "Cari data pariwisata", icon: "🏖️" },
  { text: "Data penduduk Jepara", icon: "📊" },
  { text: "Bagaimana E-Ticketing bekerja?", icon: "🎫" },
];

// ─── Markdown Components (light mode typography) ──────────────────
const md: Components = {
  p: ({ children }) => (
    <p style={{ margin: "0.4em 0", lineHeight: 1.7, fontSize: 13.5 }}>{children}</p>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 650, color: "#0f172a" }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ fontStyle: "italic", color: "#64748b" }}>{children}</em>
  ),
  ul: ({ children }) => (
    <ul style={{ margin: "0.4em 0", paddingLeft: 20, listStyleType: "disc" }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: "0.4em 0", paddingLeft: 20, listStyleType: "decimal" }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ margin: "0.2em 0", lineHeight: 1.65, fontSize: 13.5 }}>{children}</li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#2563eb",
        textDecoration: "none",
        borderBottom: "1px solid rgba(37,99,235,0.25)",
        transition: "border-color 0.15s",
      }}
    >
      {children}
    </a>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code
          style={{
            display: "block",
            background: "#f1f5f9",
            border: "1px solid rgba(37,99,235,0.10)",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            color: "#334155",
            overflowX: "auto",
            lineHeight: 1.5,
            margin: "0.5em 0",
          }}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        style={{
          background: "rgba(37,99,235,0.06)",
          padding: "0.12em 0.45em",
          borderRadius: 4,
          fontSize: "0.9em",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#2563eb",
        }}
      >
        {children}
      </code>
    );
  },
  h1: ({ children }) => <h1 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0.6em 0 0.3em" }}>{children}</h1>,
  h2: ({ children }) => <h2 style={{ fontSize: 15.5, fontWeight: 650, color: "#0f172a", margin: "0.5em 0 0.25em" }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: "0.4em 0 0.2em" }}>{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote
      style={{
        margin: "0.5em 0",
        padding: "6px 12px",
        borderLeft: "3px solid rgba(37,99,235,0.35)",
        background: "rgba(37,99,235,0.03)",
        borderRadius: "0 6px 6px 0",
        color: "#475569",
      }}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr style={{ border: "none", borderTop: "1px solid rgba(37,99,235,0.08)", margin: "0.6em 0" }} />,
};

// ─── SamiAvatar ───────────────────────────────────────────────────
function SamiAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const s = size === "sm" ? 26 : 34;
  return (
    <div
      style={{
        width: s,
        height: s,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
      }}
      aria-hidden="true"
    >
      <Sparkles size={size === "sm" ? 13 : 16} color="#fff" strokeWidth={1.8} />
    </div>
  );
}

// ─── TypingIndicator ──────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="sami-msg-enter" style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "6px 0" }}>
      <SamiAvatar size="sm" />
      <div
        style={{
          background: "#f8fafc",
          border: "1px solid rgba(37,99,235,0.08)",
          borderRadius: "4px 14px 14px 14px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span className="sami-typing-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563eb" }} />
        <span className="sami-typing-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563eb" }} />
        <span className="sami-typing-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563eb" }} />
        <span style={{ fontSize: 11.5, color: "#94a3b8", marginLeft: 4, fontWeight: 500 }}>Mencari data SAMUDRA...</span>
      </div>
    </div>
  );
}

// ─── SourceRef ────────────────────────────────────────────────────
function SourceRef({ sources, navigation }: { sources?: Message["sources"]; navigation?: Message["navigation"] }) {
  if ((!sources || sources.length === 0) && !navigation) return null;

  return (
    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
      {sources && sources.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 500 }}>Sumber:</span>
          {sources.slice(0, 2).map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="sami-source-btn">
              {s.title}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      )}
      {navigation && (
        <a
          href={navigation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sami-source-btn"
          style={{ width: "fit-content" }}
        >
          {navigation.label} →
          <ExternalLink size={10} />
        </a>
      )}
    </div>
  );
}

// ─── ChatMessage ──────────────────────────────────────────────────
function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div
      className="sami-msg-enter"
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        gap: 7,
        alignItems: "flex-start",
        padding: "3px 0",
      }}
    >
      {!isUser && <SamiAvatar size="sm" />}
      <div style={{ maxWidth: isUser ? "78%" : "84%", display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            background: isUser ? "#2563eb" : "#ffffff",
            border: isUser ? "none" : "1px solid rgba(37,99,235,0.08)",
            borderRadius: isUser ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
            padding: isUser ? "9px 13px" : "10px 13px",
            color: isUser ? "#ffffff" : "#1e293b",
            fontSize: 13.5,
            lineHeight: 1.65,
            wordBreak: "break-word",
            boxShadow: isUser ? "0 2px 8px rgba(37,99,235,0.18)" : "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          {isUser ? (
            <span style={{ fontWeight: 500 }}>{msg.content}</span>
          ) : (
            <div className="sami-md">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
                {msg.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {!isUser && <SourceRef sources={msg.sources} navigation={msg.navigation} />}
      </div>
    </div>
  );
}

// ─── WelcomeScreen ────────────────────────────────────────────────
function WelcomeScreen({ onSend }: { onSend: (msg: string) => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px 18px",
        textAlign: "center",
        flex: 1,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <SamiAvatar size="md" />
      </div>
      <p style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 3px 0" }}>
        Halo, saya SAMI 👋
      </p>
      <p style={{ fontSize: 12.5, color: "#64748b", margin: "0 0 6px 0", lineHeight: 1.5 }}>
        Saya adalah <strong style={{ color: "#2563eb", fontWeight: 600 }}>SAMUDRA AI Assistant</strong>.
      </p>
      <p style={{ fontSize: 12.5, color: "#64748b", margin: "0 0 20px 0", lineHeight: 1.65, maxWidth: 270 }}>
        Saya membantu Anda menemukan informasi, data, layanan, dan fitur di{" "}
        <strong style={{ color: "#2563eb", fontWeight: 600 }}>SAMUDRA Jepara</strong>.
      </p>
      <div
        style={{
          padding: "7px 12px",
          borderRadius: 8,
          background: "rgba(37,99,235,0.04)",
          border: "1px solid rgba(37,99,235,0.08)",
          marginBottom: 22,
          maxWidth: 300,
        }}
      >
        <p style={{ fontSize: 10.5, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
          Saya bisa membantu pertanyaan terkait SAMUDRA Jepara, data, layanan, dan informasi Kabupaten Jepara.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, width: "100%", maxWidth: 290 }}>
        {QUICK_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => onSend(q.text)}
            className="sami-chip"
            style={{ justifyContent: "flex-start", width: "100%", gap: 8 }}
          >
            <span style={{ fontSize: 13 }}>{q.icon}</span>
            <span>{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────
export default function SamiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: 1024, h: 768 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const update = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = windowSize.w < 768;

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (!showScrollBtn) scrollToBottom();
  }, [messages, isLoading, showScrollBtn, scrollToBottom]);

  const handleScroll = useCallback(() => {
    const c = chatContainerRef.current;
    if (!c) return;
    setShowScrollBtn(c.scrollHeight - c.scrollTop - c.clientHeight > 80);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const history = messages.map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/sami/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data: ApiResponse = await res.json();

        const assistantMsg: Message = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.response || "Terjadi kesalahan.",
          timestamp: Date.now(),
          sources: data.sources || [],
          navigation: data.navigation || null,
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: "assistant",
            content: "Maaf, SAMI sedang mengalami kendala saat memproses permintaan Anda. Silakan coba lagi beberapa saat.",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [messages, isLoading]
  );

  const clearConversation = useCallback(() => {
    setMessages([]);
    setIsMinimized(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage]
  );

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ─── Floating Button ─── */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          aria-label="Open SAMI AI Assistant"
          className="sami-fab"
          style={{
            position: "fixed",
            bottom: isMobile ? 16 : 24,
            right: isMobile ? 16 : 24,
            width: isMobile ? 56 : 62,
            height: isMobile ? 56 : 62,
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            boxShadow: "0 4px 16px rgba(37,99,235,0.35), 0 2px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            animation: "sami-pulse 3.5s ease-in-out infinite",
            transition: "transform 0.2s cubic-bezier(.4,0,.2,1), box-shadow 0.2s",
            outline: "none",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,99,235,0.45), 0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,99,235,0.35), 0 2px 6px rgba(0,0,0,0.1)";
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.93)"; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
        >
          <Sparkles size={isMobile ? 22 : 26} color="#fff" strokeWidth={1.8} />
        </button>
      )}

      {/* ─── Chat Window ─── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="SAMI Chat Assistant"
          aria-modal="true"
          className="sami-chat-window"
          style={{
            position: "fixed",
            bottom: isMobile ? 0 : 24,
            right: isMobile ? 0 : 24,
            width: isMobile ? "100vw" : 400,
            height: isMobile ? "100vh" : "min(620px, calc(100vh - 48px))",
            borderRadius: isMobile ? 0 : 20,
            background: "#f0f4fa",
            border: isMobile ? "none" : "1px solid rgba(37,99,235,0.10)",
            boxShadow: isMobile ? "none" : "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 99999,
            animation: "sami-window-in 0.28s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <style>{`
            @keyframes sami-window-in {
              from { opacity: 0; transform: translateY(14px) scale(0.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @media (max-width: 767px) {
              .sami-chat-bottom-bar { padding-bottom: env(safe-area-inset-bottom, 0px) !important; }
            }
          `}</style>

          {/* ─── Header ─── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "12px 14px" : "13px 15px",
              borderBottom: "1px solid rgba(37,99,235,0.08)",
              background: "#ffffff",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <SamiAvatar size="md" />
              <div>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "#0f172a" }}>
                  ✦ SAMI
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                  <span style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 500 }}>SAMUDRA AI Assistant</span>
                  <span className="sami-online-dot" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {hasMessages && (
                <button onClick={clearConversation} aria-label="Clear conversation" title="Hapus percakapan" className="sami-header-btn">
                  <Trash2 size={15} />
                </button>
              )}
              <button onClick={() => setIsMinimized((v) => !v)} aria-label={isMinimized ? "Expand SAMI" : "Minimize SAMI"} className="sami-header-btn">
                {isMinimized ? <ChevronDown size={15} /> : <Minus size={15} />}
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close SAMI AI Assistant" className="sami-header-btn">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* ─── Body ─── */}
          {!isMinimized && (
            <>
              <div
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="sami-scrollbar"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: isMobile ? "10px 12px" : "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {!hasMessages ? (
                  <WelcomeScreen onSend={sendMessage} />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingBottom: 6 }}>
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} msg={msg} />
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>
                )}

                {showScrollBtn && (
                  <button
                    onClick={() => { scrollToBottom(); setShowScrollBtn(false); }}
                    aria-label="Scroll to bottom"
                    style={{
                      position: "sticky",
                      bottom: 6,
                      alignSelf: "center",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "1px solid rgba(37,99,235,0.12)",
                      background: "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      zIndex: 10,
                    }}
                  >
                    <ChevronDown size={14} />
                  </button>
                )}
              </div>

              {/* ─── Input ─── */}
              <div
                className="sami-chat-bottom-bar"
                style={{
                  padding: isMobile ? "8px 10px" : "9px 11px",
                  borderTop: "1px solid rgba(37,99,235,0.06)",
                  background: "#ffffff",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 7,
                    background: "#f8fafc",
                    border: "1px solid rgba(37,99,235,0.10)",
                    borderRadius: 13,
                    padding: "7px 9px",
                    transition: "border-color 0.2s",
                  }}
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Tanyakan tentang SAMUDRA..."
                    rows={1}
                    aria-label="Type your message"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#1e293b",
                      fontSize: 13,
                      lineHeight: 1.5,
                      resize: "none",
                      fontFamily: "var(--font-sami)",
                      maxHeight: 80,
                      padding: "1px 3px",
                    }}
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    aria-label="Send message"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      border: "none",
                      background: input.trim() && !isLoading
                        ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                        : "#e2e8f0",
                      cursor: input.trim() && !isLoading ? "pointer" : "default",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                      opacity: input.trim() && !isLoading ? 1 : 0.5,
                    }}
                  >
                    <Send
                      size={15}
                      color={input.trim() && !isLoading ? "#fff" : "#94a3b8"}
                      style={{ marginLeft: -1 }}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
