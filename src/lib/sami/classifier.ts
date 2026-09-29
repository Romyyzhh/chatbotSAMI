// SAMI Domain Classifier — Very permissive for Jepara-related queries
// Only blocks completely unrelated queries (e.g., general AI tasks, tech support, etc.)

export type DomainClassification = "IN_DOMAIN" | "OUT_OF_DOMAIN" | "UNCERTAIN";

// Patterns that indicate a query is completely OUTSIDE Jepara/SAMUDRA domain
// Only block queries that are CLEARLY unrelated
const OUT_OF_DOMAIN_PATTERNS: RegExp[] = [
  // General AI assistant requests (clearly unrelated)
  /^(buatkan?\s+)(website|aplikasi|program|code|bot|game|logo|desain(?!.*jepara))/i,
  /^(write|create|generate)\s+(a\s+)?(code|program|app|website)/i,
  /^translate\s+(this|it|the|ke\s+bahasa)/i,
  /^(hitung|tambah|kurang|kalikan|bagi|sqrt|akar)\s*\d/i,
  /^(siapa\s+pencipta\s+(chatgpt|ai|internet|robot))/i,
  /^(apa\s+(kode\s+)?promo|voucher|kupon)\s/i,
  /^(beli|harga)\s+(iphone|samsung|laptop|motor|mobil|properti)/i,
  /^(resep|cara\s+masak)\s+(nasi\s+goreng|ayam\s+goreng|rendang|soto\s+ayam)/i,
  /^(cuaca\s+(di\s+)?(jakarta|bandung|surabaya|yogyakarta|semarang|solo|bali|manado))/i,
  /^(berita|headline)\s+(hari\s+ini|terkini)\s*(tentang|seputar)?\s*(?!.*jepara)/i,
  /^(prediksi|skor)\s+(bola|sepak|liga|champions|world\s?cup)/i,
  /^(download|unduh)\s+(lagu|film|video|apk|apk\s+mod)/i,
  /^(aplikasi|app)\s+(edit\s+foto|video|musik|obrolan)/i,
];

// Patterns that indicate the query IS related to Jepara/SAMUDRA
const JEPARA_KEYWORDS: string[] = [
  "jepara", "samudra", "karimunjawa", "diskominfo",
  "kota ukir", "kota mebel", "kota kelapa", "kopra", "ukir", "ukiran", "motel",
  "pariwisata jepara", "wisata jepara", "pantai jepara", "bandengan",
  "penduduk jepara", "kecamatan jepara", "data jepara", "statistik jepara",
  "cuaca jepara", "nelayan jepara", "perikanan jepara", "pertanian jepara",
  "kesehatan jepara", "kemiskinan jepara", "ipm jepara", "pdrb jepara",
  "inflasi jepara", "lowongan kerja jepara", "harga jepara",
  "perizinan jepara", "investasi jepara", "pma jepara",
  "dokter jepara", "rumah sakit jepara", "rs jepara",
  "hotel jepara", "resto jepara", "kuliner jepara",
  "mebel jepara", "motel jepara", "tiket jepara",
  "ktp jepara", "penduduk", "kependudukan", "e-tiket", "etiket",
  "cctv jepara", "walidata", "geospasial", "peta jepara",
  "ikupd", "perangkat desa", "linmas",
  "bupati jepara", "pemkab jepara", "pemerintah jepara", "dprd jepara",
  "universitas jepara", "kampus jepara", "sekolah jepara",
  "telp jepara", "nomor telepon jepara", "kontak jepara", "kantor jepara",
];

// SAMUDRA service keywords
const SAMUDRA_SERVICE_KEYWORDS: string[] = [
  "samudra", "data terkini", "data sektoral", "e-walidata", "e-tiket", "etiket",
  "cctv", "publikasi", "infografis", "iku", "ikupd", "layanan 112",
  "data kesehatan", "data lingkungan", "data ketenagakerjaan", "data perdagangan",
  "data sosial", "data kependudukan", "data perizinan", "data pariwisata",
  "data permukiman", "data kepegawaian", "data peraturan", "data informasi",
  "data perikanan", "data pertanian", "data infrastruktur",
  "bps jepara", "harga komoditas", "mutu air", "darah pmi", "rawat inap",
  "jadwal dokter", "lowongan kerja", "rtlh", "nelayan", "kapal",
  "produk hukum", "perda", "perbup", "agenda rapat",
  "kondisi jalan", "perpipaan", "air minum",
];

// Broad Jepara topic keywords (when combined with context)
const BROAD_JEPARA_TOPICS: string[] = [
  "tentang", "apa itu", "dimana", "kapan", "bagaimana", "siapa",
  "sejarah", "budaya", "tradisi", "adat", "budaya jawa",
  "ekonomi", "sosial", "demografi", "geografi",
  "pemerintahan", "politik", "kebijakan", "perencanaan",
  "pembangunan", "infrastruktur", "daerah", "wilayah",
  "pertanian", "perikanan", "industri", "perdagangan",
  "pendidikan", "kesehatan", "lingkungan",
  "wisata", "travel", "liburan", "kunjungan",
  "ktp", "akta", "penduduk", "pendudukan",
  "izin", "usaha", "investasi", "umkm",
];

/**
 * Classifies a user query into domain categories.
 * Very permissive — defaults to IN_DOMAIN for ambiguous queries.
 */
export function classifyDomain(query: string): DomainClassification {
  const lowerQuery = query.toLowerCase().trim();

  // Empty or very short queries — assume in-domain
  if (lowerQuery.length <= 3) return "IN_DOMAIN";

  // Step 1: Check for OUT_OF_DOMAIN patterns
  // These must be very specific to avoid false negatives
  for (const pattern of OUT_OF_DOMAIN_PATTERNS) {
    if (pattern.test(lowerQuery)) return "OUT_OF_DOMAIN";
  }

  // Step 2: Check for Jepara-specific keywords → definitely IN_DOMAIN
  for (const keyword of JEPARA_KEYWORDS) {
    if (lowerQuery.includes(keyword.toLowerCase())) return "IN_DOMAIN";
  }

  // Step 3: Check for SAMUDRA service keywords → definitely IN_DOMAIN
  for (const keyword of SAMUDRA_SERVICE_KEYWORDS) {
    if (lowerQuery.includes(keyword.toLowerCase())) return "IN_DOMAIN";
  }

  // Step 4: Check for greeting/conversational patterns → IN_DOMAIN (SAMI can handle)
  const greetings = /^(halo|hai|hi|hello|hey|selamat|pagi|siang|sore|malam|terima\s+kasih|makasih|thanks|mantap|bagus|oke|ok|yuk|ayo|apa\s+kabar|siapa\s+kamu|namamu)/i;
  if (greetings.test(lowerQuery)) return "IN_DOMAIN";

  // Step 5: Default to UNCERTAIN (which routes to AI — let the AI decide)
  return "UNCERTAIN";
}
