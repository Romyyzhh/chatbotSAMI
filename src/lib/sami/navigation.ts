// Navigation helper for SAMI

import { SAMUDRA_BASE_URL } from "./knowledge";

export interface NavigationAction {
  label: string;
  url: string;
  type: "page" | "data" | "service" | "external";
}

export function detectNavigationIntent(query: string): NavigationAction | null {
  const lowerQuery = query.toLowerCase();

  // CCTV
  if (/cctv|kamera.*monitor|pantau.*live/i.test(lowerQuery)) {
    return {
      label: "Buka CCTV",
      url: `${SAMUDRA_BASE_URL}/cctv`,
      type: "service",
    };
  }

  // E-Ticketing
  if (/tiket|ticket|e-?ticketing|etiket|beli.*tiket|booking.*tiket/i.test(lowerQuery)) {
    return {
      label: "Buka E-Ticketing",
      url: `${SAMUDRA_BASE_URL}/etiket`,
      type: "service",
    };
  }

  // Pariwisata / Wisata
  if (/wisata|pariwisata|hotel|resto|restoran|objek.*wisata|jalan.?jalan|liburan|pantai(?!\s*luar)/i.test(lowerQuery)) {
    return {
      label: "Buka Data Pariwisata",
      url: `${SAMUDRA_BASE_URL}/data/pariwisata`,
      type: "data",
    };
  }

  // Kesehatan
  if (/kesehatan|dokter|rsud|rumah.?sakit|darah|pmi|rawat.?inap|jadwal.?dokter/i.test(lowerQuery)) {
    return {
      label: "Buka Data Kesehatan",
      url: `${SAMUDRA_BASE_URL}/data/kesehatan`,
      type: "data",
    };
  }

  // Lowongan Kerja
  if (/lowongan|kerja|pekerjaan|job|loker|career/i.test(lowerQuery)) {
    return {
      label: "Buka Lowongan Kerja",
      url: `${SAMUDRA_BASE_URL}/data/ketenagakerjaan/lowongan-kerja`,
      type: "data",
    };
  }

  // Harga / Komoditas
  if (/harga|komoditas|pangan|beras|bawang|inflasi/i.test(lowerQuery)) {
    return {
      label: "Buka Harga Komoditas",
      url: `${SAMUDRA_BASE_URL}/data/perindustrian/harga-pangan-jepara`,
      type: "data",
    };
  }

  // Cuaca
  if (/cuaca|weather|prakiraan/i.test(lowerQuery)) {
    return {
      label: "Buka Prakiraan Cuaca",
      url: `${SAMUDRA_BASE_URL}/data/lingkungan/cuaca`,
      type: "data",
    };
  }

  // Kependudukan
  if (/penduduk|kependudukan|population|nik|ktp/i.test(lowerQuery)) {
    return {
      label: "Buka Data Kependudukan",
      url: `${SAMUDRA_BASE_URL}/data/kependudukan`,
      type: "data",
    };
  }

  // Publikasi
  if (/publikasi|infografis|regulasi|buku.*digital|download|dokumen/i.test(lowerQuery)) {
    return {
      label: "Buka Publikasi",
      url: `${SAMUDRA_BASE_URL}/publikasi`,
      type: "data",
    };
  }

  // Geospasial / Peta
  if (/peta|geospasial|gis|mapping|geoportal/i.test(lowerQuery)) {
    return {
      label: "Buka Peta",
      url: `${SAMUDRA_BASE_URL}/peta`,
      type: "service",
    };
  }

  // E-Walidata
  if (/walidata|statistik.?sektoral/i.test(lowerQuery)) {
    return {
      label: "Buka E-Walidata",
      url: `${SAMUDRA_BASE_URL}/e-walidata`,
      type: "service",
    };
  }

  // Perizinan
  if (/perizinan|izin|lisensi|permit/i.test(lowerQuery)) {
    return {
      label: "Buka Data Perizinan",
      url: `${SAMUDRA_BASE_URL}/data/perizinan`,
      type: "data",
    };
  }

  // IKU
  if (/iku|indikator.*kinerja/i.test(lowerQuery)) {
    return {
      label: "Buka IKU",
      url: `${SAMUDRA_BASE_URL}/data/iku`,
      type: "data",
    };
  }

  // FAQ
  if (/faq|pertanyaan.*umum|bantuan|help/i.test(lowerQuery)) {
    return {
      label: "Buka FAQ",
      url: `${SAMUDRA_BASE_URL}/faq`,
      type: "page",
    };
  }

  // Tentang
  if (/tentang.*samudra|tentang.*kami|tentang.*ini/i.test(lowerQuery)) {
    return {
      label: "Buka Tentang SAMUDRA",
      url: `${SAMUDRA_BASE_URL}/tentang-kami`,
      type: "page",
    };
  }

  // Lingkungan
  if (/lingkungan|mutu.?air|polusi/i.test(lowerQuery)) {
    return {
      label: "Buka Data Lingkungan",
      url: `${SAMUDRA_BASE_URL}/data/lingkungan`,
      type: "data",
    };
  }

  // Pertanian
  if (/pertanian|agriculture|tanaman|sawah|panen/i.test(lowerQuery)) {
    return {
      label: "Buka Data Pertanian",
      url: `${SAMUDRA_BASE_URL}/data/pertanian`,
      type: "data",
    };
  }

  // Perikanan
  if (/perikanan|ikan|nelayan|fishing|tambak/i.test(lowerQuery)) {
    return {
      label: "Buka Data Perikanan",
      url: `${SAMUDRA_BASE_URL}/data/perikanan`,
      type: "data",
    };
  }

  return null;
}
