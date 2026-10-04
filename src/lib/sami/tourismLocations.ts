// Tourism Locations Data — Lokasi Wisata Kabupaten Jepara
// Setiap entry memiliki: nama, alamat lengkap, kecamatan, deskripsi, dan Google Maps link
// Google Maps link menggunakan search URL yang selalu memberikan lokasi terbaru dan akurat

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
    address: "Desa Bandengan, Kecamatan Batealit, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Batealit",
    description: "Pantai populer di utara Kota Jepara dengan pasir putih dan pemandangan Laut Jawa. Terletak tidak jauh dari pusat kota, menjadi tujuan favorit warga untuk berlibur.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Bandengan+Jepara",
    keywords: ["bandengan", "pantai bandengan", "pantai ayu", "wisata pantai jepara", "pantai utara jepara", "pantai populer jepara"],
  },
  {
    id: "benteng-portugis",
    name: "Benteng Portugis",
    category: "sejarah",
    address: "Kawasan Pelabuhan Jepara, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description: "Benteng peninggalan kolonial Portugis di kawasan pesisir Kota Jepara, dekat area pelabuhan. Menyimpan jejak sejarah maritim Jepara sejak abad ke-16.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Benteng+Portugis+Jepara",
    keywords: ["benteng portugis", "benteng", "peninggalan portugis", "sejarah jepara", "benteng tua jepara", "cagar budaya jepara"],
  },
  {
    id: "museum-kartini",
    name: "Museum R.A. Kartini",
    category: "budaya",
    address: "Jl. Kartini No. 1, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description: "Museum yang didedikasikan untuk pahlawan nasional R.A. Kartini. Menyimpan koleksi benda bersejarah dan informasi tentang kehidupan Kartini serta sejarah Jepara.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Museum+R.A.+Kartini+Jepara",
    keywords: ["museum kartini", "museum", "kartini", "jepara pahlawan wanita", "museum jepara", "benda bersejarah"],
  },
  {
    id: "karimunjawa",
    name: "Kepulauan Karimunjawa",
    category: "pulau",
    address: "Kecamatan Karimunjawa, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Karimunjawa",
    description: "Gugusan kepulauan yang menjadi Taman Nasional Karimunjawa. Terkenal dengan keindahan bawah lautnya, snorkeling, diving, dan pemandangan pulau-pulau kecil yang eksotis.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kepulauan+Karimunjawa+Jepara",
    keywords: ["karimunjawa", "taman nasional karimunjawa", "pulau karimunjawa", "wisata bahari karimunjawa", "snorkeling karimunjawa", "diving karimunjawa", "pulau karimun"],
  },
  {
    id: "pulau-panjang",
    name: "Pulau Panjang",
    category: "pulau",
    address: "Di Laut Jawa, diakses dari Pelabuhan Jepara, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description: "Pulau kecil di lepas pantai Jepara yang dapat dicapai dengan perahu dari Pelabuhan Jepara. Menawarkan keindahan laut, pasir putih, dan spot snorkeling.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pulau+Panjang+Jepara",
    keywords: ["pulau panjang", "pulau panjang jepara", "pulau di jepara", "wisata pulau jepara", "snorkeling pulau panjang"],
  },
  {
    id: "pantai-keling",
    name: "Pantai Keling",
    category: "pantai",
    address: "Desa Keling, Kecamatan Keling, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Keling",
    description: "Pantai di ujung timur Kabupaten Jepara yang masih alami. Dikelilingi perbukitan hijau dan menjadi salah satu pantai terindah di Jepara timur.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Keling+Jepara",
    keywords: ["pantai keling", "keling", "pantai timur jepara", "pantai ujung timur", "keling beach", "wisata keling"],
  },
  {
    id: "air-terjun-songgolangit",
    name: "Air Terjun Songgolangit",
    category: "alam",
    address: "Desa Batealit, Kecamatan Batealit, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Batealit",
    description: "Air terjun alami di kawasan hutan Kabupaten Jepara. Terletak di perbukitan, menawarkan suasana alam yang sejuk dan segar.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Air+Terjun+Songgolangit+Jepara",
    keywords: ["songgolangit", "air terjun", "air terjun jepara", "wisata alam jepara", "songgolangit batealit", "curug songgolangit"],
  },
  {
    id: "gua-semar",
    name: "Gua Semar",
    category: "alam",
    address: "Desa Batealit, Kecamatan Batealit, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Batealit",
    description: "Gua alami yang berlokasi di kawasan perbukitan Jepara. Menawarkan pemandangan gua dan udara sejuk dengan suasana alam yang menenangkan.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Gua+Semar+Jepara",
    keywords: ["gua semar", "gua", "gua jepara", "wisata gua jepara", "gua di jepara"],
  },
  {
    id: "pantai-pailus",
    name: "Pantai Pailus",
    category: "pantai",
    address: "Desa Pailus, Kecamatan Pecangaan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pecangaan",
    description: "Pantai di selatan Jepara yang dikenal dengan ombak dan hamparan pasir yang luas. Menjadi tujuan wisata pantai selatan Kabupaten Jepara.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Pailus+Jepara",
    keywords: ["pailus", "pantai pailus", "pantai selatan jepara", "pantai pecangaan", "wisata pailus"],
  },
  {
    id: "pantai-moro-kondo",
    name: "Pantai Moro Kondo",
    category: "pantai",
    address: "Kecamatan Pecangaan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pecangaan",
    description: "Pantai selatan Jepara yang dikenal dengan batu karangnya. Suasana yang tenang dan indah, cocok untuk menikmati pemandangan laut selatan.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Moro+Kondo+Jepara",
    keywords: ["moro kondo", "pantai moro kondo", "pantai selatan jepara", "pantai batu karang jepara"],
  },
  {
    id: "pantai-kalianget",
    name: "Pantai Kalianget",
    category: "pantai",
    address: "Desa Kalianget, Kecamatan Mlonggo, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Mlonggo",
    description: "Pantai di wilayah Mlonggo, salah satu kecamatan pesisir di Jepara. Menawarkan keindahan pantai dan kehidupan nelayan setempat.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Kalianget+Jepara",
    keywords: ["kalianget", "pantai kalianget", "pantai mlonggo", "pantai pesisir jepara", "wisata mlonggo"],
  },
  {
    id: "pantai-teluk-awur",
    name: "Pantai Teluk Awur",
    category: "pantai",
    address: "Desa Telukawur, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description: "Pantai yang berada di teluk alami di utara Kota Jepara. Pemandangan laut yang tenang dengan hutan bakau di sekitarnya.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Teluk+Awur+Jepara",
    keywords: ["teluk awur", "pantai teluk awur", "teluk jepara", "pantai utara jepara", "wisata teluk awur"],
  },
  {
    id: "pantai-bondo",
    name: "Pantai Bondo",
    category: "pantai",
    address: "Kecamatan Pecangaan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pecangaan",
    description: "Pantai selatan Jepara dengan pemandangan laut yang luas. Menjadi tujuan wisata pantai selatan yang populer di kalangan warga lokal.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Bondo+Jepara",
    keywords: ["bondo", "pantai bondo", "pantai selatan jepara", "pantai pecangaan"],
  },
  {
    id: "pantai-ujungbatu",
    name: "Pantai Ujungbatu",
    category: "pantai",
    address: "Kecamatan Pak Aji, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pak Aji",
    description: "Pantai di ujung timur Kabupaten Jepara yang dikenal dengan batu-batu besar di tepi pantai. Suasana alami dan masih sepi pengunjung.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Ujungbatu+Jepara",
    keywords: ["ujungbatu", "pantai ujungbatu", "pantai batu besar", "pantai pak aji", "wisata pak aji"],
  },
  {
    id: "pantai-gemblong",
    name: "Pantai Gemblong",
    category: "pantai",
    address: "Kecamatan Donorojo, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Donorojo",
    description: "Pantai di wilayah Donorojo, kecamatan pesisir selatan Jepara. Pemandangan laut selatan yang indah dengan ombak yang berbeda dari pantai utara.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Gemblong+Jepara",
    keywords: ["gemblong", "pantai gemblong", "pantai donorojo", "pantai selatan jepara", "wisata donorojo"],
  },
  {
    id: "pantai-suweru",
    name: "Pantai Suweru",
    category: "pantai",
    address: "Kecamatan Pak Aji, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pak Aji",
    description: "Pantai selatan Jepara dengan hamparan pasir dan batuan alami. Suasana yang tenang dan indah untuk menikmati keindahan pantai selatan.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Suweru+Jepara",
    keywords: ["suweru", "pantai suweru", "pantai pak aji", "pantai selatan jepara"],
  },
  {
    id: "pantai-jeruk-wangi",
    name: "Pantai Jeruk Wangi",
    category: "pantai",
    address: "Kecamatan Pak Aji, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pak Aji",
    description: "Pantai yang berada di wilayah perbukitan selatan Jepara. Dikenal dengan keindahan alam dan suasana yang masih asri.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Jeruk+Wangi+Jepara",
    keywords: ["jeruk wangi", "pantai jeruk wangi", "pantai pak aji", "pantai selatan jepara", "pantai perbukitan jepara"],
  },
  {
    id: "pantai-jembang",
    name: "Pantai Jembang",
    category: "pantai",
    address: "Desa Jembang, Kecamatan Keling, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Keling",
    description: "Pantai di wilayah Keling yang menawarkan keindahan pantai timur Jepara. Dikelilingi perbukitan dan hutan bakau.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Jembang+Jepara",
    keywords: ["jembang", "pantai jembang", "pantai keling", "pantai timur jepara", "wisata jembang"],
  },
  {
    id: "pantai-kaliwangi",
    name: "Pantai Kaliwangi",
    category: "pantai",
    address: "Kecamatan Pecangaan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pecangaan",
    description: "Pantai selatan Jepara yang terletak di kawasan Pecangaan. Pemandangan laut selatan yang indah dengan suasana yang masih alami.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Kaliwangi+Jepara",
    keywords: ["kaliwangi", "pantai kaliwangi", "pantai pecangaan", "pantai selatan jepara"],
  },
  {
    id: "pantai-batu-layar",
    name: "Pantai Batu Layar",
    category: "pantai",
    address: "Kecamatan Pecangaan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Pecangaan",
    description: "Pantai selatan Jepara dengan formasi batuan alami di sepanjang tepi pantai. Pemandangan yang unik dengan ombak laut selatan.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Batu+Layar+Jepara",
    keywords: ["batu layar", "pantai batu layar", "pantai pecangaan", "pantai selatan jepara", "pantai batu karang"],
  },
  {
    id: "pantai-kartini",
    name: "Pantai Kartini",
    category: "pantai",
    address: "Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Jepara",
    description: "Pantai di pusat Kota Jepara yang menjadi ikon wisata kota. Terletak dekat dengan pusat kota, mudah diakses oleh warga dan wisatawan.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Kartini+Jepara",
    keywords: ["pantai kartini", "pantai kota jepara", "pantai pusat kota", "pantai jepara kota", "wisata kota jepara"],
  },
  {
    id: "kawasan-industri-mebel",
    name: "Kawasan Industri Mebel Jepara",
    category: "kekinian",
    address: "Kecamatan Tahunan, Kabupaten Jepara, Jawa Tengah",
    district: "Kecamatan Tahunan",
    description: "Sentra industri mebel dan ukiran yang terkenal hingga mancanegara. Pengunjung dapat melihat proses pembuatan mebel dan ukiran khas Jepara.",
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
 * Mendapatkan Google Maps URL untuk lokasi wisata tertentu
 * @param locationId ID lokasi wisata
 * @returns Google Maps URL
 */
export function getGoogleMapsUrl(locationId: string): string {
  const loc = tourismLocations.find((l) => l.id === locationId);
  return loc?.googleMapsUrl || "";
}
