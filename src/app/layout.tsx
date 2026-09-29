import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SAMI — SAMUDRA AI Assistant",
  description:
    "SAMI adalah AI Assistant untuk membantu pengguna menemukan informasi, data, layanan, dan fitur yang tersedia di SAMUDRA Jepara.",
  keywords: ["SAMUDRA", "Jepara", "AI Assistant", "SAMI", "Data Jepara", "Portal Data"],
  authors: [{ name: "DISKOMINFO Kabupaten Jepara" }],
  openGraph: {
    title: "SAMI — SAMUDRA AI Assistant",
    description: "AI Assistant untuk SAMUDRA Jepara",
    url: "https://samudra.jepara.go.id",
    siteName: "SAMUDRA Jepara",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-sami)",
          background: "#f0f4fa",
          color: "#1e293b",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
