"use client";

import dynamic from "next/dynamic";

const SamiWidget = dynamic(() => import("@/components/sami/SamiWidget"), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "linear-gradient(180deg, #e8eef8 0%, #f0f4fa 40%, #f5f7fb 100%)",
      }}
    >
      <div style={{ maxWidth: 640, textAlign: "center" }}>
        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: "0 8px 24px rgba(37,99,235,0.25)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #1d4ed8, #2563eb, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 8px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          SAMUDRA
        </h1>

        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#64748b",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "0 0 20px",
          }}
        >
          Satu Manajemen untuk Data Jepara
        </p>

        <p
          style={{
            fontSize: 15,
            color: "#64748b",
            lineHeight: 1.7,
            margin: "0 0 32px",
          }}
        >
          Portal data terintegrasi yang menyediakan akses mudah dan dapat dipercaya
          terhadap data strategis dan prioritas Kabupaten Jepara.
        </p>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {[
            { icon: "📊", label: "Data Terkini" },
            { icon: "🗺️", label: "Geospasial" },
            { icon: "📹", label: "CCTV" },
            { icon: "🎫", label: "E-Ticketing" },
            { icon: "📰", label: "Publikasi" },
            { icon: "📋", label: "E-Walidata" },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                padding: "16px 12px",
                borderRadius: 14,
                background: "#ffffff",
                border: "1px solid rgba(37,99,235,0.08)",
                textAlign: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#475569" }}>{f.label}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
          💬 Klik tombol{" "}
          <span style={{ color: "#2563eb", fontWeight: 600 }}>SAMI</span>{" "}
          di pojok kanan bawah untuk bertanya tentang data, layanan, dan informasi SAMUDRA Jepara.
        </p>
      </div>

      <SamiWidget />
    </main>
  );
}
