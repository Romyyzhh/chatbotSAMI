// Tourism Locations Data — Lokasi Wisata Kabupaten Jepara
// Setiap entry memiliki: nama, alamat lengkap, kecamatan, deskripsi, dan Google Maps link
// Google Maps link menggunakan search URL yang selalu memberikan lokasi terbaru dan akurat
//
// CATATAN VERIFIKASI (Oktober 2026):
// Alamat tiap lokasi diverifikasi ke sumber publik (Wikipedia, Disparbud Jepara,
// Kompas, Traveloka, travelspromo, dll) sebelum dicatat di sini.
// Lokasi yang TIDAK bisa diverifikasi TIDAK ditulis di sini — lebih baik tidak ada
// data daripada data yang salah, karena SAMI menjawab alamat apa adanya dari file ini.

export interface TourismLocation {
  id: string;
  name: string;
  category: "pantai" | "pulau" | "budaya" | "sejarah" | "alam" | "kekinian";
  address: string;
  district: string; // kecamatan
  description: string;
  googleMapsUrl: string; // Google Maps search URL
  keywords: string[];
}

export const tourismLocations: TourismLocation[] = [
  {
    id: "pantai-bandengan",
    name: "Pantai Bandengan",
    category: "pantai",
    address: "Desa Bandengan, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description:
      "Pantai berpasir putih sekitar 7 km di utara pusat Kota Jepara. Salah satu pantai paling populer di Jepara, cocok untuk berlibur bersama keluarga.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Bandengan+Jepara",
    keywords: ["bandengan", "pantai bandengan", "wisata pantai jepara", "pantai populer jepara", "pantai pasir putih jepara"],
  },
  {
    id: "benteng-portugis",
    name: "Benteng Portugis",
    category: "sejarah",
    address: "Desa Banyumanis, Kecamatan Donorojo, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Donorojo",
    description:
      "Benteng peninggalan kolonial di atas bukit batu tepi laut, berlokasi di Desa Banyumanis, sekitar 45 km dari pusat Kota Jepara. Salah satu objek wisata sejarah andalan Jepara.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Benteng+Portugis+Banyumanis+Jepara",
    keywords: ["benteng portugis", "benteng", "peninggalan portugis", "sejarah jepara", "benteng tua jepara", "cagar budaya jepara", "banyumanis", "donorojo"],
  },
  {
    id: "museum-kartini",
    name: "Museum R.A. Kartini",
    category: "budaya",
    address: "Jl. Kartini No. 1, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description:
      "Museum yang didedikasikan untuk pahlawan nasional R.A. Kartini. Menyimpan koleksi benda bersejarah dan informasi tentang kehidupan Kartini serta sejarah Jepara.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Museum+R.A.+Kartini+Jepara",
    keywords: ["museum kartini", "museum", "kartini", "jepara pahlawan wanita", "museum jepara", "benda bersejarah"],
  },
  {
    id: "karimunjawa",
    name: "Kepulauan Karimunjawa",
    category: "pulau",
    address: "Kecamatan Karimunjawa, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Karimunjawa",
    description:
      "Gugusan kepulauan yang menjadi Taman Nasional Karimunjawa. Terkenal dengan keindahan bawah lautnya, snorkeling, diving, dan pemandangan pulau-pulau kecil yang eksotis.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kepulauan+Karimunjawa+Jepara",
    keywords: ["karimunjawa", "taman nasional karimunjawa", "pulau karimunjawa", "wisata bahari karimunjawa", "snorkeling karimunjawa", "diving karimunjawa", "pulau karimun"],
  },
  {
    id: "pulau-panjang",
    name: "Pulau Panjang",
    category: "pulau",
    address: "Kelurahan Ujung Batu, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah (diakses dari Pelabuhan Kartini)",
    district: "Kecamatan Jepara",
    description:
      "Pulau kecil sekitar 4 km di barat Pelabuhan Kartini, diakses dengan perahu dari pelabuhan. Menawarkan pasir putih dan spot snorkeling, sering dijuluki 'Karimunjawa mini'.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pulau+Panjang+Jepara",
    keywords: ["pulau panjang", "pulau panjang jepara", "pulau di jepara", "wisata pulau jepara", "snorkeling pulau panjang", "ujung batu"],
  },
  {
    id: "pantai-kartini",
    name: "Pantai Kartini",
    category: "pantai",
    address: "Kelurahan Bulu, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description:
      "Pantai ikonik di pusat Kota Jepara, sekitar 2,5 km barat pendopo Kantor Bupati. Pusat pelayaran ke Pulau Panjang dan Karimunjawa, dengan taman dan kolam kura-kura.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Kartini+Jepara",
    keywords: ["pantai kartini", "pelabuhan kartini", "pantai kota jepara", "pantai pusat kota", "wisata kota jepara", "taman kura kura"],
  },
  {
    id: "pantai-keling",
    name: "Pantai Keling",
    category: "pantai",
    address: "Kecamatan Keling, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Keling",
    description:
      "Pantai di wilayah timur Kabupaten Jepara yang masih alami. Dikelilingi perbukitan hijau dan menjadi salah satu pantai di Jepara timur.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Keling+Jepara",
    keywords: ["pantai keling", "keling", "pantai timur jepara", "keling beach", "wisata keling", "desa wisata tempur"],
  },
  {
    id: "air-terjun-songgolangit",
    name: "Air Terjun Songgolangit",
    category: "alam",
    address: "Dukuh Nglencer, Desa Bucu, Kecamatan Kembang, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Kembang",
    description:
      "Air terjun setinggi sekitar 80 meter di lereng Gunung Muria, sekitar 30 km dari pusat Kota Jepara. Dinamakan Songgolangit karena airnya jatuh bertingkat seperti langit.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Air+Terjun+Songgolangit+Jepara",
    keywords: ["songgolangit", "songgo langit", "air terjun", "air terjun jepara", "wisata alam jepara", "curug songgolangit", "desa bucu", "kecembang"],
  },
  {
    id: "pantai-pailus",
    name: "Pantai Pailus",
    category: "pantai",
    address: "Desa Karanggondang, Kecamatan Mlonggo, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Mlonggo",
    description:
      "Pantai berpasir putih yang tenang dengan pemandangan matahari terbenam, tidak jauh dari pusat Kota Jepara.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Pailus+Jepara",
    keywords: ["pailus", "pantai pailus", "pailus beach", "pantai mlonggo", "wisata pailus", "karanggondang"],
  },
  {
    id: "pantai-teluk-awur",
    name: "Pantai Teluk Awur",
    category: "pantai",
    address: "Desa Telukawur, Kecamatan Tahunan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Tahunan",
    description:
      "Pantai di teluk alami sekitar 7 km dari pusat Kota Jepara, dikelilingi hutan bakau. Cocok untuk menikmati suasana pantai yang tenang.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Teluk+Awur+Jepara",
    keywords: ["teluk awur", "telukawur", "pantai teluk awur", "pantai tahunan", "wisata teluk awur", "hutan bakau"],
  },
  {
    id: "pantai-bondo",
    name: "Pantai Bondo",
    category: "pantai",
    address: "Desa Bondo, Kecamatan Bangsri, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Bangsri",
    description:
      "Pantai di utara Kota Jepara sekitar 15 km dari pusat kota, juga dikenal sebagai Pantai Ombak Mati karena ombaknya yang relatif tenang.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Bondo+Bangsri+Jepara",
    keywords: ["bondo", "pantai bondo", "ombak mati", "pantai bangsri", "pantai utara jepara"],
  },
  {
    id: "pantai-suweru",
    name: "Pantai Suweru",
    category: "pantai",
    address: "Desa Balong, Kecamatan Kembang, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Kembang",
    description:
      "Pantai berpasir hitam di pesisir utara sekitar 30 km dari pusat Kota Jepara, dikenal juga sebagai Pantai Banyu Towo.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Suweru+Balong+Jepara",
    keywords: ["suweru", "pantai suweru", "banyu towo", "pantai pasir hitam", "desa balong", "pantai kembang"],
  },
  {
    id: "pantai-blebak",
    name: "Pantai Blebak",
    category: "pantai",
    address: "Desa Sekuro, Kecamatan Mlonggo, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Mlonggo",
    description:
      "Pantai berpasir putih di Desa Sekuro yang populer sebagai tempat menikmati matahari terbenam, dekat dengan kawasan wisata Mlonggo.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Blebak+Sekuro+Jepara",
    keywords: ["blebak", "pantai blebak", "sekuro", "pantai mlonggo", "sunset jepara", "pantai pasir putih"],
  },
  {
    id: "pantai-empu-rancak",
    name: "Pantai Empu Rancak (Purancak)",
    category: "pantai",
    address: "Desa Karang Gondang, Kecamatan Mlonggo, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Mlonggo",
    description:
      "Pantai yang juga dikenal sebagai Pantai Purancak, terletak di Desa Karang Gondang. Kawasan pesisir dengan rumah-rumah nelayan dan kuliner seafood.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Empu+Rancak+Jepara",
    keywords: ["empu rancak", "purancak", "pantai purancak", "pantai karang gondang", "pantai mlonggo", "seafood jepara"],
  },
  {
    id: "kawasan-industri-mebel",
    name: "Kawasan Industri Mebel Jepara",
    category: "kekinian",
    address: "Kecamatan Tahunan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Tahunan",
    description:
      "Sentra industri mebel dan ukiran yang terkenal hingga mancanegara. Pengunjung dapat melihat proses pembuatan mebel dan ukiran khas Jepara.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Industri+Mebel+Jepara+Tahunan",
    keywords: ["industri mebel", "mebel jepara", "ukiran jepara", "industri ukir", "kawasan mebel", "sentra mebel", "toko mebel jepara", "industri mebel tahunan"],
  },
];

/**
 * Mencari lokasi wisata berdasarkan query pengguna
 * @param query Pertanyaan pengguna tentang lokasi wisata
 * @returns Array TourismLocation yang paling relevan
 */
export function findTourismLocations(query: string): TourismLocation[] {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = tourismLocations.map((loc) => {
    let score = 0;

    // Cek nama lokasi
    const nameLower = loc.name.toLowerCase();
    if (lowerQuery.includes(nameLower) || nameLower.includes(lowerQuery)) {
      score += 100;
    }

    // Cek keyword
    for (const word of words) {
      for (const kw of loc.keywords) {
        if (kw.includes(word) || word.includes(kw)) score += 20;
      }
      // Cek nama
      if (nameLower.includes(word)) score += 30;
      // Cek kategori
      if (loc.category.includes(word)) score += 5;
    }

    return { location: loc, score };
  });

  return scored
    .filter((s) => s.score > 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.location);
}

/**
 * Mencari lokasi wisata yang benar-benar ditanyakan oleh pengguna.
 * Berbeda dengan findTourismLocations (fuzzy), fungsi ini hanya mengembalikan
 * lokasi yang namanya/keyword-nya benar-benar muncul di query,
 * agar UI tidak menampilkan tombol lokasi untuk tempat lain.
 */
export function findLocationForQuery(query: string): TourismLocation | null {
  const lowerQuery = query.toLowerCase();

  for (const loc of tourismLocations) {
    if (lowerQuery.includes(loc.name.toLowerCase())) return loc;
    if (loc.keywords.some((kw) => lowerQuery.includes(kw.toLowerCase()))) return loc;
  }

  return null;
}

/**
 * Mendapatkan Google Maps URL untuk lokasi wisata tertentu
 * @param locationId ID lokasi wisata
 * @returns Google Maps URL
 */
export function getGoogleMapsUrl(locationId: string): string {
  const loc = tourismLocations.find((l) => l.id === locationId);
  return loc?.googleMapsUrl || "";
}
