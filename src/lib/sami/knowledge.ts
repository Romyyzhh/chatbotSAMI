// SAMI Knowledge Base — Comprehensive data about SAMUDRA Jepara & Kabupaten Jepara
// Sumber utama: https://samudra.jepara.go.id/

import { TFIDFEngine } from "./tfidf";

export const SAMUDRA_BASE_URL = "https://samudra.jepara.go.id";

export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  url: string;
  keywords: string[];
}

export interface NavigationLink {
  label: string;
  url: string;
  keywords: string[];
}

// ─── Navigation Links ─────────────────────────────────────────────
export const navigationLinks: NavigationLink[] = [
  { label: "Beranda SAMUDRA", url: "/", keywords: ["beranda", "home", "halaman utama"] },
  { label: "Data Terkini", url: "/data/terkini", keywords: ["data terkini", "data umum", "semua data"] },
  { label: "Data Pariwisata", url: "/data/pariwisata", keywords: ["pariwisata", "wisata", "hotel", "resto", "tiket", "kunjungan wisata"] },
  { label: "Data Kesehatan", url: "/data/kesehatan", keywords: ["kesehatan", "rumah sakit", "dokter", "darah", "pmi", "rawat inap"] },
  { label: "Data Lingkungan", url: "/data/lingkungan", keywords: ["lingkungan", "cuaca", "mutu air", "kualitas air"] },
  { label: "Data Ketenagakerjaan", url: "/data/ketenagakerjaan", keywords: ["ketenagakerjaan", "lowongan kerja", "pekerjaan", "kartu ak1", "pengangguran"] },
  { label: "Data Perdagangan", url: "/data/perindustrian", keywords: ["perdagangan", "harga komoditas", "harga pangan", "ekonomi"] },
  { label: "Data Sosial Desa", url: "/data/sosial-desa", keywords: ["sosial", "desa", "perangkat desa", "linmas", "kemiskinan sosial"] },
  { label: "Data Kependudukan", url: "/data/kependudukan", keywords: ["kependudukan", "penduduk", "ktp", "akta kelahiran", "agama", "perkawinan", "jenis kelamin"] },
  { label: "Data Perizinan", url: "/data/perizinan", keywords: ["perizinan", "izin usaha", "investasi", "pma", "pmdn", "modal"] },
  { label: "Data Permukiman", url: "/data/permukiman", keywords: ["permukiman", "rumah", "rtlh", "perumahan"] },
  { label: "Data Kepegawaian", url: "/data/kepegawaian", keywords: ["kepegawaian", "pegawai", "asn", "pns", "eselon", "golongan"] },
  { label: "Data Peraturan", url: "/data/peraturan", keywords: ["peraturan", "regulasi", "produk hukum", "perda", "perbup"] },
  { label: "Data Informasi", url: "/data/informasi", keywords: ["informasi", "agenda rapat", "berita"] },
  { label: "Data Perikanan", url: "/data/perikanan", keywords: ["perikanan", "nelayan", "kapal", "kelompok nelayan", "ninja"] },
  { label: "Data Pertanian", url: "/data/pertanian", keywords: ["pertanian", "tanaman", "peternakan", "produksi pertanian"] },
  { label: "Data Infrastruktur", url: "/data/infrastruktur", keywords: ["infrastruktur", "jalan", "air minum", "perpipaan"] },
  { label: "Data Instansi Vertikal", url: "/data/instansi-vertikal", keywords: ["instansi vertikal", "bps", "pdrb", "ipm", "kemiskinan", "inflasi"] },
  { label: "CCTV Jepara", url: "/cctv", keywords: ["cctv", "kamera", "pantauan", "titik strategis"] },
  { label: "E-Ticketing Wisata", url: "/etiket", keywords: ["e-tiket", "etiket", "tiket wisata", "booking wisata", "qris"] },
  { label: "E-Walidata", url: "/e-walidata", keywords: ["walidata", "statistik sektoral"] },
  { label: "Peta / Geospasial", url: "/peta", keywords: ["peta", "geospasial", "gis", "pemetaan"] },
  { label: "Publikasi", url: "/publikasi", keywords: ["publikasi", "infografis", "regulasi", "buku digital"] },
  { label: "IKU", url: "/data/iku", keywords: ["iku", "indikator kinerja utama"] },
  { label: "IKU Perangkat Daerah", url: "/data/ikupd", keywords: ["ikupd", "ikpd", "kinerja perangkat daerah"] },
  { label: "Daftar Hotel", url: "/data/pariwisata/daftar-hotel", keywords: ["hotel", "penginapan", "akomodasi"] },
  { label: "Daftar Resto", url: "/data/pariwisata/daftar-resto", keywords: ["resto", "restoran", "kuliner", "makanan"] },
  { label: "Daftar Dokter", url: "/data/kesehatan/daftar-jadwal-dokter-spesialis", keywords: ["dokter", "jadwal dokter", "spesialis"] },
  { label: "Tentang SAMUDRA", url: "/tentang-kami", keywords: ["tentang", "about", "siapa", "profil"] },
  { label: "FAQ", url: "/faq", keywords: ["faq", "pertanyaan umum", "bantuan", "help"] },
  { label: "PDRB Jepara", url: "/data/instansi-vertikal/bps/show/52", keywords: ["pdrb", "produk domestik regional bruto", "ekonomi jepara", "pertumbuhan ekonomi"] },
  { label: "IPM Jepara", url: "/data/instansi-vertikal/bps/show/26", keywords: ["ipm", "indeks pembangunan manusia", "kualitas hidup"] },
  { label: "Inflasi Jepara", url: "/data/instansi-vertikal/bps/show/3/539", keywords: ["inflasi", "harga", "daya beli"] },
  { label: "Kemiskinan Jepara", url: "/data/instansi-vertikal/bps/show/23", keywords: ["kemiskinan", "miskin", "garis kemiskinan"] },
  { label: "Lowongan Kerja", url: "/data/ketenagakerjaan/lowongan-kerja", keywords: ["lowongan kerja", "loker", "pekerjaan", "karir"] },
  { label: "Harga Komoditas", url: "/data/perindustrian/harga-pangan-jepara", keywords: ["harga komoditas", "harga pangan", "harga beras", "harga sayur"] },
  { label: "Prakiraan Cuaca", url: "/data/lingkungan/cuaca", keywords: ["cuaca", "prakiraan cuaca", "hujan", "panas"] },
  { label: "Mutu Air", url: "/data/lingkungan/mutu-air", keywords: ["mutu air", "kualitas air"] },
  { label: "Persediaan Darah PMI", url: "/data/kesehatan/persediaan-darah-pmi", keywords: ["darah", "pmi", "persediaan darah", "donor darah"] },
  { label: "Ruang Rawat Inap", url: "/data/kesehatan/rawat-inap", keywords: ["rawat inap", "kamar rawat", "tempat tidur rs"] },
  { label: "RTLH", url: "/data/permukiman/rtlh", keywords: ["rtlh", "rumah tidak layak huni"] },
  { label: "Data Nelayan (NINJA)", url: "/data/perikanan/nelayan", keywords: ["nelayan", "ninja", "data nelayan"] },
  { label: "Kondisi Jalan", url: "/data/infrastruktur/jalan", keywords: ["kondisi jalan", "jalan rusak", "jalan kabupaten"] },
  { label: "Air Minum Perpipaan", url: "/data/infrastruktur/perpipaan", keywords: ["air minum", "perpipaan", "pdam"] },
  { label: "Gender Jepara", url: "/data/instansi-vertikal/bps/show/40", keywords: ["gender", "laki-laki", "perempuan", "jenis kelamin jepara"] },
  { label: "Agama Jepara", url: "/data/instansi-vertikal/bps/show/108", keywords: ["agama", "islam", "kristen", "hindu", "budha"] },
];

// ─── Knowledge Base Entries ───────────────────────────────────────
export const knowledgeBase: KnowledgeEntry[] = [
  // ═══ TENTANG SAMUDRA ═══
  {
    id: "tentang-samudra",
    title: "Tentang SAMUDRA",
    content: `SAMUDRA adalah kependekan dari "Satu Manajemen untuk Data Jepara". SAMUDRA adalah portal data terintegrasi yang dikelola oleh Dinas Komunikasi dan Informatika (DISKOMINFO) Kabupaten Jepara. Portal ini menyediakan akses mudah dan dapat dipercaya terhadap data strategis dan prioritas Kabupaten Jepara.

SAMUDRA bertujuan untuk mengintegrasikan data dan statistik di Kabupaten Jepara guna memudahkan akses informasi publik. Platform ini dibuat oleh DISKOMINFO Jepara dan berkolaborasi dengan perangkat daerah terkait.

Layanan utama SAMUDRA meliputi: Data Terkini, Data Sektoral (16 kategori), Publikasi, CCTV (43 titik), Geospasial/Peta, E-Ticketing, E-Walidata, dan Layanan 112.

Kontak: Dinas Komunikasi dan Informatika Kab. Jepara, Jl. Kartini No. 1 Jepara (Gedung OPD Bersama), Telp. (0291) 591492, Fax. (0291) 591037, Email: data@jepara.go.id, diskominfo@jepara.go.id.`,
    url: "/tentang-kami",
    keywords: ["samudra", "tentang samudra", "apa itu samudra", "profil", "diskominfo", "portal data", "manajemen data jepara", "tentang", "about", "siapa"],
  },
  {
    id: "layanan-samudra",
    title: "Layanan Utama SAMUDRA",
    content: `SAMUDRA menyediakan layanan utama berikut:

1. **Data Terkini** — Dashboard data strategis Kabupaten Jepara yang terdiri dari 16 kategori data sektoral.
2. **Data Sektoral** — Data mendalam per kategori (Kesehatan, Lingkungan, Ketenagakerjaan, Perdagangan, Sosial & Desa, Kependudukan, Perizinan, Pariwisata, Permukiman, Kepegawaian, Peraturan, Informasi, Perikanan, Infrastruktur, Instansi Vertikal, Pertanian).
3. **Publikasi** — Koleksi Infografis, Regulasi, dan Buku Digital.
4. **CCTV** — Pantauan CCTV di 43 titik strategis di Kabupaten Jepara.
5. **Geospasial / Peta** — Layanan peta dan pemetaan untuk Kabupaten Jepara.
6. **E-Ticketing** — Sistem pemesanan tiket wisata online, cepat dan mudah dengan pembayaran QRIS.
7. **E-Walidata** — Informasi Statistik Sektoral Daerah Kabupaten Jepara.
8. **IKU dan IKU Perangkat Daerah** — Indikator Kinerja Utama pemerintah daerah.`,
    url: "/",
    keywords: ["layanan", "fitur", "services", "apa saja", "menu", "navigasi", "fitur samudra"],
  },

  // ═══ KOTA / KABUPATEN JEPARA ═══
  {
    id: "tentang-jepara",
    title: "Kabupaten Jepara",
    content: `Kabupaten Jepara adalah salah satu kabupaten di Provinsi Jawa Tengah, Indonesia. Ibukota Kabupaten Jepara adalah Kota Jepara. Kabupaten Jepara dikenal sebagai:
- **Kota Ukir** — pusat kerajinan ukir kayu yang terkenal hingga mancanegara
- **Kota Kelapa** — penghasil kopra terbesar di Jawa Tengah
- **Kota Mebel** — sentra industri mebel yang mendunia
- Pusat industri perikanan dan kelautan
- Daerah dengan pantai dan wisata bahari yang indah, termasuk Kepulauan Karimunjawa

Kabupaten Jepara terdiri dari 16 kecamatan. Jepara memiliki garis pantai sepanjang lebih dari 70 km menghadap Laut Jawa dan Laut Karimunjawa. Geografi Jepara meliputi dataran rendah, perbukitan, dan kepulauan (Karimunjawa).

Mata pencaharian utama penduduk Jepara: industri mebel/ukir, perikanan, pertanian (kelapa, padi, palawija), perdagangan, dan pariwisata.`,
    url: "/tentang-kami",
    keywords: ["jepara", "kabupaten jepara", "kota jepara", "tentang jepara", "profil jepara", "sejarah jepara", "geografi jepara", "penduduk jepara", "kecamatan jepara"],
  },
  {
    id: "kecamatan-jepara",
    title: "Kecamatan di Kabupaten Jepara",
    content: `Kabupaten Jepara terdiri dari 16 kecamatan:

1. **Jepara** — ibukota kabupaten, pusat pemerintahan dan perdagangan
2. **Kedung** — kawasan industri mebel dan ukir
3. **Pecangaan** — kawasan pesisir dan perdagangan
4. **Welahan** — kawasan pertanian dan perikanan
5. **Mayong** — kawasan pertanian dan industri
6. **Nalumsari** — kawasan perbukitan dan pertanian
7. **Tahunan** — kawasan perindustrian mebel
8. **Mlonggo** — kawasan pesisir dan perikanan
9. **Bangsri** — kawasan pesisir, perikanan, dan pariwisata pantai
10. **Sukodono** — kawasan pertanian
11. **Kalinyamatan** — kawasan industri mebel ukir
12. **Karimunjawa** — Kepulauan Karimunjawa, destinasi wisata bahari
13. **Kemiri** — kawasan pesisir utara
14. **Pak Aji** — kawasan perbukitan
15. **Donorojo** — kawasan pesisir selatan
16. **Jerukwudel** — kawasan pertanian dan pesisir`,
    url: "/data/kependudukan",
    keywords: ["kecamatan", "daftar kecamatan", "kelurahan", "desa", "wilayah jepara", "pembagian wilayah"],
  },
  {
    id: "penduduk-jepara",
    title: "Data Penduduk Kabupaten Jepara",
    content: `Data kependudukan Kabupaten Jepara yang tersedia di SAMUDRA meliputi:

- **Jumlah Penduduk Berdasarkan Agama Per Kecamatan** — data keagamaan penduduk per kecamatan
- **Jumlah Penduduk Berdasarkan Status Perkawinan** — data status pernikahan penduduk
- **Jumlah Penduduk Wajib KTP dan Kepemilikan KTP per Kecamatan** — data identitas kependudukan
- **Jumlah Akta Kelahiran Penduduk Usia 0-18 Tahun** — data pencatatan kelahiran
- **Jumlah Akta Kelahiran Penduduk Usia 0-5 Tahun** — data kelahiran anak usia dini
- **Jumlah Penduduk Menurut Jenis Kelamin** — data rasio jenis kelamin
- **Jumlah Penduduk Menurut Usia** — data piramida usia

Untuk data detail lengkap, kunjungi Dashboard Kependudukan di SAMUDRA.`,
    url: "/data/kependudukan",
    keywords: ["penduduk", "populasi", "jumlah penduduk", "data kependudukan", "ktp", "akta", "jenis kelamin", "agama penduduk", "usia penduduk", "perkawinan"],
  },

  // ═══ PARIWISATA ═══
  {
    id: "pariwisata-jepara",
    title: "Pariwisata Kabupaten Jepara",
    content: `Kabupaten Jepara memiliki potensi pariwisata yang sangat besar, terutama wisata bahari. Data pariwisata yang tersedia di SAMUDRA meliputi:

**Data yang tersedia:**
- Rekap Kunjungan Wisata Per Triwulan (data per kuartal tahunan)
- Data Objek Wisata (daftar seluruh objek wisata)
- Daftar Hotel di Kabupaten Jepara
- Daftar Resto di Kabupaten Jepara
- Jumlah Kunjungan Wisata Berdasarkan Tiket Elektronik
- Dashboard Pariwisata dengan analisis berdasarkan: Jenis Pengunjung, Pertahun, Wisatawan Nusantara, dan Wisatawan Mancanegara

**Destinasi Wisata Unggulan Jepara:**
- Kepulauan Karimunjawa (Taman Nasional Karimunjawa)
- Pantai Bandengan (Pantai Ayu)
- Benteng Portugis
- Museum R.A. Kartini
- Pulau Panjang
- Air Terjun Songgolangit
- Gua Semar
- Wisata Bahari dan Diving/Snorkeling

Sumber data pariwisata dari Dinas Pariwisata dan Kebudayaan Kabupaten Jepara.`,
    url: "/data/pariwisata",
    keywords: ["pariwisata", "wisata", "objek wisata", "pantai", "karimunjawa", "kunjungan wisata", "hotel", "resto", "tiket wisata", "travel", "liburan", "jalan-jalan", "vacation", "tourism"],
  },
  {
    id: "hotel-jepara",
    title: "Daftar Hotel di Kabupaten Jepara",
    content: `SAMUDRA menyediakan daftar lengkap hotel dan penginapan yang ada di Kabupaten Jepara. Data ini membantu wisatawan dan masyarakat untuk menemukan akomodasi yang sesuai.

Hotel-hotel di Jepara tersebar di beberapa kawasan strategis:
- **Kawasan Kota Jepara** — hotel berbintang dan melati
- **Kawasan Karimunjawa** — resort dan penginapan di pulau
- **Kawasan Pantai Bandengan** — villa dan penginapan dekat pantai
- **Kawasan Bangsri** — penginapan dekat pelabuhan Karimunjawa

Untuk melihat daftar lengkap hotel, kunjungi halaman Daftar Hotel di SAMUDRA.`,
    url: "/data/pariwisata/daftar-hotel",
    keywords: ["hotel", "penginapan", "villa", "resort", "kamar", "akomodasi", "menginap", "boking hotel", "cari hotel"],
  },
  {
    id: "resto-jepara",
    title: "Daftar Resto di Kabupaten Jepara",
    content: `SAMUDRA menyediakan daftar restoran dan tempat makan di Kabupaten Jepara. Jepara terkenal dengan kuliner khas seperti:
- Bandeng presto Jepara
- Tahu sumedang Jepara
- Soto Jepara
- Pindang serani
- Opor Jepara
- Berbagai olahan seafood dan ikan segar dari nelayan lokal

Resto dan rumah makan tersebar di seluruh kota dan kecamatan di Kabupaten Jepara.`,
    url: "/data/pariwisata/daftar-resto",
    keywords: ["resto", "restoran", "rumah makan", "kuliner", "makanan", "tempat makan", "food", "restaurant", "daftar resto"],
  },
  {
    id: "e-tiket-wisata",
    title: "E-Ticketing Wisata Jepara",
    content: `E-Tiket Wisata adalah layanan pemesanan tiket wisata online yang tersedia di SAMUDRA. Pengunjung dapat:
1. **Pilih Destinasi Wisata** — pilih lokasi wisata yang ingin dikunjungi
2. **Pilih Tiket** — tentukan jenis dan jumlah tiket
3. **Lengkapi Data Pemesan** — isi data diri pemesan
4. **Selesaikan Pembayaran** — scan QRIS untuk membayar menggunakan mobile banking atau dompet digital
5. **E-Tiket** — setelah pembayaran berhasil, tunjukkan e-tiket kepada petugas di lokasi

Proses pemesanan: cepat, mudah, dan cashless. E-tiket berisi: Order ID, Destinasi, Nama Pemesan, dan Tanggal Kunjungan.

Akses E-Ticketing di: https://samudra.jepara.go.id/etiket`,
    url: "/etiket",
    keywords: ["e-tiket", "etiket", "tiket wisata", "booking wisata", "pesan tiket", "qris", "bayar tiket", "tiket online", "e-ticketing", "cara beli tiket"],
  },

  // ═══ KESEHATAN ═══
  {
    id: "kesehatan-jepara",
    title: "Data Kesehatan Kabupaten Jepara",
    content: `Dashboard Kesehatan di SAMUDRA menyediakan data:

1. **Persediaan Darah PMI Kabupaten Jepara** — data stok darah di Palang Merah Indonesia Kabupaten Jepara. Termasuk golongan darah: A, B, AB, O, dengan kondisi: tersedia, menipis, atau kosong.

2. **Ketersediaan Ruang Rawat Inap di Fasilitas Kesehatan** — data kamar rawat inap yang tersedia di rumah sakit dan klinik di Kabupaten Jepara. Membantu masyarakat mencari tempat rawat inap yang masih tersedia.

3. **Daftar Jadwal Praktik Dokter Spesialis di Kabupaten Jepara** — jadwal lengkap praktik dokter spesialis di seluruh Kabupaten Jepara. Memudahkan masyarakat mengetahui kapan dan di mana dokter spesialis praktek.

Rumah sakit utama di Jepara: RSUD Kartini, RS Umum, dan berbagai klinik/swasta.`,
    url: "/data/kesehatan",
    keywords: ["kesehatan", "rumah sakit", "dokter", "darah pmi", "rawat inap", "jadwal dokter", "spesialis", "klinik", "faskes", "fasilitas kesehatan", "persediaan darah", "health"],
  },
  {
    id: "dokter-spesialis",
    title: "Jadwal Dokter Spesialis Jepara",
    content: `SAMUDRA menyediakan daftar jadwal praktik dokter spesialis di Kabupaten Jepara. Data ini mencakup jadwal dokter spesialis umum, dokter spesialis anak, dokter spesialis kandungan, dan berbagai spesialis lainnya yang berpraktik di Kabupaten Jepara.

Untuk melihat jadwal lengkap dan terbaru, kunjungi: https://samudra.jepara.go.id/data/kesehatan/daftar-jadwal-dokter-spesialis`,
    url: "/data/kesehatan/daftar-jadwal-dokter-spesialis",
    keywords: ["jadwal dokter", "dokter spesialis", "dokter umum", "dokter anak", "dokter kandungan", "dokter gigi", "jadwal praktik", "cari dokter"],
  },

  // ═══ LINGKUNGAN ═══
  {
    id: "lingkungan-jepara",
    title: "Data Lingkungan Kabupaten Jepara",
    content: `Dashboard Lingkungan di SAMUDRA menyediakan:

1. **Mutu Air** — data kualitas/mutu air di Kabupaten Jepara. Meliputi parameter-parameter kualitas air bersih dan air baku.

2. **Prakiraan Cuaca Kabupaten Jepara** — informasi prakiraan cuaca terkini untuk wilayah Kabupaten Jepara. Membantu masyarakat dan nelayan merencanakan aktivitas.

Cuaca di Jepara dipengaruhi oleh musim dan letak geografis sebagai daerah pesisir. Jepara memiliki iklim tropis dengan musim hujan ( Oktober-Maret ) dan musim kemarau ( April-September ).`,
    url: "/data/lingkungan",
    keywords: ["lingkungan", "cuaca", "mutu air", "kualitas air", "prakiraan cuaca", "iklim", "musim", "hujan", "panas", "weather", "water quality"],
  },

  // ═══ KETENAGAKERJAAN ═══
  {
    id: "ketenagakerjaan-jepara",
    title: "Data Ketenagakerjaan Kabupaten Jepara",
    content: `Dashboard Ketenagakerjaan di SAMUDRA menyediakan data:

1. **Pengajuan Kartu AK/I Berdasarkan Pendidikan** — data pengajuan kartu tanda pencari kerja (AK-1) dikelompokkan berdasarkan jenjang pendidikan. Menunjukkan profil pencari kerja berdasarkan tingkat pendidikan.

2. **Pengajuan Kartu AK/I Berdasarkan Kecamatan** — data pengajuan kartu pencari kerja dikelompokkan berdasarkan kecamatan asal. Menunjukkan distribusi pencari kerja per wilayah.

3. **Lowongan Kerja** — data lowongan kerja yang tersedia di Kabupaten Jepara. Membantu masyarakat mencari peluang kerja di wilayah Jepara.`,
    url: "/data/ketenagakerjaan",
    keywords: ["ketenagakerjaan", "lowongan kerja", "loker", "pekerjaan", "pengangguran", "pencari kerja", "kartu ak1", "karir", "emploiement", "job", "lowongan", "kerja"],
  },

  // ═══ PERDAGANGAN & EKONOMI ═══
  {
    id: "perdagangan-jepara",
    title: "Data Perdagangan dan Harga Komoditas",
    content: `Dashboard Perdagangan di SAMUDRA menyediakan data Harga Komoditas Kabupaten Jepara. Data ini mencakup:
- Harga beras per kg di berbagai kecamatan
- Harga sayuran (cabai, tomat, bawang, dll.)
- Harga bahan pokok lainnya
- Tren harga komoditas dari waktu ke waktu

Data harga komoditas membantu masyarakat memantau harga kebutuhan pokok dan membantu pengambil kebijakan ekonomi daerah.`,
    url: "/data/perindustrian/harga-pangan-jepara",
    keywords: ["harga komoditas", "harga pangan", "perdagangan", "harga beras", "harga cabai", "ekonomi", "harga kebutuhan pokok", "inflasi daerah", "harga jual"],
  },

  // ═══ SOSIAL & DESA ═══
  {
    id: "sosial-desa-jepara",
    title: "Data Sosial dan Desa",
    content: `Dashboard Sosial Desa di SAMUDRA menyediakan:

1. **Overview Data Perangkat Desa** — data lengkap perangkat desa di seluruh Kabupaten Jepara, termasuk kepala desa, sekretaris desa, dan perangkat desa lainnya.

2. **Data Linmas Kabupaten Jepara** — data Perlindungan Masyarakat (Linmas) yang berfungsi sebagai garda terdepan dalam ketertiban dan keamanan masyarakat di tingkat desa dan kelurahan.`,
    url: "/data/sosial-desa",
    keywords: ["sosial", "desa", "perangkat desa", "linmas", "kelurahan", "pembangunan desa", "dusun", "rw", "rt", "social"],
  },

  // ═══ PERIZINAN ═══
  {
    id: "perizinan-jepara",
    title: "Data Perizinan Kabupaten Jepara",
    content: `Dashboard Perizinan di SAMUDRA menyediakan data:

1. **Data Perizinan Usaha Non OSS** — data izin usaha yang dikeluarkan melalui sistem selain Online Single Submission (OSS). Meliputi izin usaha UMKM, izin perdagangan, dan lainnya.

2. **Data Penanaman Modal Asing (PMA)** — data investasi asing yang masuk ke Kabupaten Jepara. Menunjukkan arus modal asing dan sektor yang diminati investor asing.

3. **Data Penanaman Modal Dalam Negeri (PMDN)** — data investasi dalam negeri di Kabupaten Jepara. Menunjukkan perkembangan investasi domestik di Jepara.

Data perizinan membantu memantau iklim investasi dan kemudahan berusaha di Kabupaten Jepara.`,
    url: "/data/perizinan",
    keywords: ["perizinan", "izin usaha", "investasi", "pma", "pmdn", "modal", "umkm", "usaha", "lisensi", "oss", "penanaman modal", "izin"],
  },

  // ═══ PERMUKIMAN ═══
  {
    id: "permukiman-jepara",
    title: "Data Permukiman Kabupaten Jepara",
    content: `Dashboard Permukiman di SAMUDRA menyediakan data:

**Data Rumah Tidak Layak Huni (RTLH)** — data rumah-rumah di Kabupaten Jepara yang dikategorikan sebagai tidak layak huni. Data ini membantu pemerintah dalam program rehabilitasi rumah dan peningkatan kualitas permukiman.`,
    url: "/data/permukiman",
    keywords: ["permukiman", "rumah", "rtlh", "rumah tidak layak huni", "perumahan", "pemukiman", "hunian", "housing"],
  },

  // ═══ KEPEGAWAIAN ═══
  {
    id: "kepegawaian-jepara",
    title: "Data Kepegawaian Kabupaten Jepara",
    content: `Dashboard Kepegawaian di SAMUDRA menyediakan data ASN (Aparatur Sipil Negara) di Kabupaten Jepara:

1. **Data Pegawai Berdasarkan Eselon** — distribusi pegawai berdasarkan jenjang jabatan struktural (Eselon I sampai IV).

2. **Data Pegawai Berdasarkan Pendidikan** — distribusi pegawai berdasarkan jenjang pendidikan terakhir.

3. **Data Pegawai Berdasarkan Usia** — distribusi pegawai berdasarkan kelompok usia.

4. **Data Pegawai Berdasarkan Golongan** — distribusi pegawai berdasarkan golongan ruang (I/a sampai IV/d).

5. **Data Pegawai Berdasarkan Jenis Kelamin** — distribusi pegawai berdasarkan laki-laki/perempuan.

6. **Data Pegawai Berdasarkan Agama** — distribusi pegawai berdasarkan kepercayaan/agama.`,
    url: "/data/kepegawaian",
    keywords: ["kepegawaian", "pegawai", "asn", "pns", "eselon", "golongan", "pns jepara", "aparatur sipil negara", "civil servant"],
  },

  // ═══ PERATURAN ═══
  {
    id: "peraturan-jepara",
    title: "Data Peraturan dan Produk Hukum",
    content: `Dashboard Peraturan di SAMUDRA menyediakan data Produk Hukum yang diterbitkan oleh Pemerintah Kabupaten Jepara. Meliputi:
- Peraturan Daerah (Perda)
- Peraturan Bupati (Perbup)
- Surat Edaran Bupati
- Keputusan Bupati
- Dan produk hukum lainnya

Data ini membantu masyarakat dan pelaku usaha mengakses regulasi yang berlaku di Kabupaten Jepara.`,
    url: "/data/peraturan",
    keywords: ["peraturan", "regulasi", "produk hukum", "perda", "perbup", "keputusan", "hukum", "undang-undang daerah", "regulation", "law"],
  },

  // ═══ INFORMASI ═══
  {
    id: "informasi-jepara",
    title: "Informasi dan Agenda Kabupaten Jepara",
    content: `Dashboard Informasi di SAMUDRA menyediakan data:
- **Agenda Rapat** — jadwal rapat dan kegiatan pemerintah Kabupaten Jepara

Informasi ini membantu masyarakat memantau agenda dan kegiatan pemerintah daerah.`,
    url: "/data/informasi",
    keywords: ["informasi", "agenda rapat", "berita", "kegiatan", "agenda pemerintah", "schedule", "information"],
  },

  // ═══ PERIKANAN ═══
  {
    id: "perikanan-jepara",
    title: "Data Perikanan Kabupaten Jepara",
    content: `Dashboard Perikanan di SAMUDRA menyediakan data dari aplikasi NINJA (Nelayan Indonesia Jaya):

1. **Data Nelayan yang Terdaftar di Aplikasi NINJA** — jumlah dan profil nelayan terdaftar di Kabupaten Jepara.

2. **Data Kelompok Nelayan Terdaftar di Aplikasi NINJA** — data kelompok-kelompok nelayan yang terorganisir.

3. **Data Kapal Terdaftar di Aplikasi NINJA** — data armada kapal penangkap ikan yang terdaftar resmi.

Jepara merupakan salah satu sentra perikanan penting di Jawa Tengah. Sektor perikanan menjadi penyangga ekonomi masyarakat pesisir.`,
    url: "/data/perikanan",
    keywords: ["perikanan", "nelayan", "kapal", "kelompok nelayan", "ninja", "ikan", "laut", "tangkap", "fishery", "fishing", "seafod"],
  },

  // ═══ PERTANIAN ═══
  {
    id: "pertanian-jepara",
    title: "Data Pertanian Kabupaten Jepara",
    content: `Dashboard Pertanian di SAMUDRA menyediakan data sektor pertanian Kabupaten Jepara. Sektor pertanian di Jepara meliputi:
- Tanaman pangan (padi, jagung, kedelai, palawija)
- Perkebunan (kelapa, kakao, kopi)
- Hortikultura (sayuran, buah-buahan)
- Peternakan

Jepara dikenal sebagai penghasil kopra terbesar di Jawa Tengah. Komoditas kelapa menjadi komoditas unggulan pertanian.`,
    url: "/data/pertanian",
    keywords: ["pertanian", "tanaman", "padi", "kelapa", "pertanian jepara", "agriculture", "farming", "kopra", "perkebunan", "peternakan"],
  },

  // ═══ INFRASTRUKTUR ═══
  {
    id: "infrastruktur-jepara",
    title: "Data Infrastruktur Kabupaten Jepara",
    content: `Dashboard Infrastruktur di SAMUDRA menyediakan:

1. **Kondisi Jalan di Kabupaten Jepara** — data kondisi jalan kabupaten dan jalan desa, termasuk panjang jalan, kondisi baik/rusak, dan rencana perbaikan.

2. **Air Minum Perpipaan** — data layanan air minum bersih melalui jaringan perpipaan (PDAM) di Kabupaten Jepara. Meliputi cakupan layanan dan kualitas air minum.`,
    url: "/data/infrastruktur",
    keywords: ["infrastruktur", "jalan", "air minum", "perpipaan", "pdam", "jembatan", "jalan rusak", "infrastructure", "road"],
  },

  // ═══ INSTANSI VERTIKAL / BPS ═══
  {
    id: "bps-jepara",
    title: "Data BPS (Badan Pusat Statistik) Jepara",
    content: `Dashboard Instansi Vertikal di SAMUDRA menampilkan data dari BPS (Badan Pusat Statistik) Kabupaten Jepara, termasuk:

1. **PDRB (Produk Domestik Regional Bruto)** — data Produk Domestik Regional Bruto Kabupaten Jepara berdasarkan Lapangan Usaha dan Pengeluaran. Menunjukkan ukuran ekonomi daerah dan struktur perekonomian.

2. **Inflasi** — data tingkat inflasi di Kabupaten Jepara. Menunjukkan perubahan harga barang dan jasa dari waktu ke waktu.

3. **IPM (Indeks Pembangunan Manusia)** — data Indeks Pembangunan Manusia Kabupaten Jepara yang mengukur pencapaian kualitas hidup berdasarkan kesehatan, pendidikan, dan standar hidup.

4. **Kemiskinan** — data tingkat kemiskinan di Kabupaten Jepara.

5. **Gender** — data kesetaraan gender di Kabupaten Jepara.

6. **Agama** — data keagamaan penduduk Kabupaten Jepara.`,
    url: "/data/instansi-vertikal/bps",
    keywords: ["bps", "statistik", "pdrb", "ipm", "kemiskinan", "inflasi", "gender", "agama", "indikator ekonomi", "indeks pembangunan", "data statistik", "ekonomi makro"],
  },

  // ═══ CCTV ═══
  {
    id: "cctv-jepara",
    title: "CCTV Kabupaten Jepara",
    content: `SAMUDRA menyediakan layanan pantauan CCTV di 43 titik strategis di Kabupaten Jepara. CCTV ini membantu:
- Pemantauan lalu lintas
- Keamanan dan ketertiban masyarakat
- Pemantauan kondisi cuaca dan banjir
- Monitoring aktivitas di titik-titik penting

CCTV dapat diakses secara real-time melalui platform SAMUDRA.`,
    url: "/cctv",
    keywords: ["cctv", "kamera", "pantauan", "live", "titik strategis", "lalu lintas", "keamanan", "monitoring", "cctv jepara"],
  },

  // ═══ E-WALIDATA ═══
  {
    id: "e-walidata-jepara",
    title: "E-Walidata Kabupaten Jepara",
    content: `E-Walidata adalah layanan Informasi Statistik Sektoral Daerah Kabupaten Jepara yang tersedia di SAMUDRA. E-Walidata menyajikan data statistik dari berbagai sektor secara terintegrasi, memudahkan akses terhadap data sektoral untuk keperluan perencanaan, pengambilan kebijakan, dan penelitian.`,
    url: "/e-walidata",
    keywords: ["walidata", "e-walidata", "statistik sektoral", "data statistik", "data sektoral"],
  },

  // ═══ PETA / GEOSPASIAL ═══
  {
    id: "peta-geospasial",
    title: "Layanan Peta dan Geospasial",
    content: `SAMUDRA menyediakan layanan geospasial dan peta Kabupaten Jepara. Layanan ini memungkinkan pengguna untuk:
- Melihat peta wilayah Kabupaten Jepara
- Identifikasi lokasi fasilitas umum
- Pemetaan data spasial
- Analisis geografis Kabupaten Jepara

Layanan peta membantu perencanaan pembangunan dan pemahaman kondisi geografis daerah.`,
    url: "/peta",
    keywords: ["peta", "geospasial", "gis", "pemetaan", "maps", "location", "lokasi", "wilayah", "spasial"],
  },

  // ═══ PUBLIKASI ═══
  {
    id: "publikasi-jepara",
    title: "Publikasi Kabupaten Jepara",
    content: `SAMUDRA menyediakan berbagai publikasi resmi Kabupaten Jepara:

1. **Infografis** — visualisasi data dan informasi dalam bentuk grafis yang mudah dipahami.

2. **Regulasi** — dokumen regulasi dan peraturan perundang-undangan yang berlaku di Kabupaten Jepara.

3. **Buku Digital** — publikasi dalam format buku digital yang dapat diakses dan diunduh.`,
    url: "/publikasi",
    keywords: ["publikasi", "infografis", "regulasi", "buku digital", "dokumen", "download", "publication", "infographic"],
  },

  // ═══ IKU ═══
  {
    id: "iku-jepara",
    title: "IKU (Indikator Kinerja Utama)",
    content: `SAMUDRA menyediakan data Indikator Kinerja Utama (IKU) Kabupaten Jepara dan IKU Perangkat Daerah (IKUPD). IKU merupakan indikator yang mengukur kinerja pemerintah daerah dalam pencapaian target pembangunan.

IKU digunakan sebagai alat monitoring dan evaluasi kinerja pemerintah Kabupaten Jepara.`,
    url: "/data/iku",
    keywords: ["iku", "indikator kinerja utama", "ikupd", "kinerja", "performance", "capaian", "target", "pembangunan daerah"],
  },

  // ═══ CONTACT & INFORMASI UMUM ═══
  {
    id: "kontak-jepara",
    title: "Kontak dan Alamat",
    content: `**Dinas Komunikasi dan Informatika Kabupaten Jepara**
- Alamat: Jl. Kartini No. 1 Jepara (Gedung OPD Bersama)
- Telepon: (0291) 591492
- Fax: (0291) 591037
- Email: data@jepara.go.id
- Email: diskominfo@jepara.go.id
- Website: https://samudra.jepara.go.id
- Website Diskominfo: https://diskominfo.jepara.go.id

Untuk pertanyaan dan saran, masyarakat dapat menghubungi kanal pengaduan yang tersedia di website SAMUDRA.`,
    url: "/tentang-kami",
    keywords: ["kontak", "alamat", "telepon", "email", "diskominfo", "hubungi", "cs", "customer service", "call center", "contact", "phone"],
  },
  {
    id: "faq-samudra",
    title: "FAQ (Pertanyaan Umum)",
    content: `FAQ (Frequently Asked Questions) SAMUDRA menampung pertanyaan umum yang sering diajukan masyarakat tentang:
- Cara mengakses data di SAMUDRA
- Cara menggunakan E-Ticketing
- Cara membaca data statistik
- Informasi layanan SAMUDRA lainnya

Jika pertanyaan Anda tidak terjawab di FAQ, silakan hubungi DISKOMINFO Kab. Jepara melalui email data@jepara.go.id atau diskominfo@jepara.go.id.`,
    url: "/faq",
    keywords: ["faq", "pertanyaan umum", "bantuan", "cara pakai", "help", "tanya jawab", "cara mengakses"],
  },
  {
    id: "hak-cipta",
    title: "Informasi Hak Cipta SAMUDRA",
    content: `Seluruh data dan informasi di SAMUDRA merupakan hak cipta Dinas Komunikasi dan Informatika Kabupaten Jepara dan mitra kerja terkait. © 2026 Dibuat oleh Diskominfo Jepara dan berkolaborasi dengan Perangkat Daerah Terkait.

SAMUDRA tunduk pada Kebijakan Penggunaan dan Privasi yang berlaku.`,
    url: "/kebijakan-penggunaan-dan-privasi",
    keywords: ["hak cipta", "copyright", "privasi", "kebijakan", "syarat ketentuan", "terms"],
  },
];

// ─── TF-IDF Search Engine ─────────────────────────────────────────
// Inisialisasi TF-IDF Engine dengan knowledge base
// Engine akan memproses semua dokumen dan menghitung IDF saat pertama kali dipanggil
const tfidfEngine = new TFIDFEngine(knowledgeBase);

/**
 * Mencari knowledge entries yang paling relevan dengan query menggunakan TF-IDF + Cosine Similarity
 *
 * Alur:
 * 1. Query di-preprocess (lowercase, tokenisasi, stopword removal)
 * 2. Hitung TF-IDF vektor untuk query
 * 3. Hitung Cosine Similarity dengan setiap dokumen
 * 4. Ambil top-8 dokumen paling relevan
 *
 * @param query Query pencarian dari user
 * @returns Array KnowledgeEntry yang diurutkan berdasarkan relevansi
 */
export function searchKnowledge(query: string): KnowledgeEntry[] {
  const results = tfidfEngine.search(query, 8);

  // Map hasil search ke interface KnowledgeEntry
  return results.map((result) => result.item);
}

// ─── Find Navigation Links ────────────────────────────────────────
export function findNavigationLinks(query: string): Array<{ label: string; url: string }> {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = navigationLinks.map((link) => {
    let score = 0;

    for (const word of words) {
      for (const kw of link.keywords) {
        if (kw.includes(word) || word.includes(kw)) score += 10;
      }
      if (link.label.toLowerCase().includes(word)) score += 15;
    }

    return { link, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => ({ label: s.link.label, url: `${SAMUDRA_BASE_URL}${s.link.url}` }));
}
