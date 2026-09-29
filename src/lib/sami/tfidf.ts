// SAMI TF-IDF Engine — Text Retrieval with TF-IDF + Cosine Similarity
// Metode pencarian dokumen berbasis vektor untuk RAG

// ─── Indonesian Stopwords ──────────────────────────────────────────
// Daftar kata umum bahasa Indonesia yang tidak memiliki makna signifikan
const STOPWORDS: Set<string> = new Set([
  "yang", "dan", "di", "ke", "dari", "ini", "itu", "untuk", "dengan",
  "pada", "adalah", "dalam", "tidak", "ada", "juga", "akan", "tetapi",
  "atau", "oleh", "karena", "sebagai", "telah", "sudah", "lebih", "bisa",
  "dapat", "hanya", "kami", "mereka", "kita", "anda", "saya", "dia",
  "lalu", "serta", "bagi", "namun", "agar", "bahwa", "jika", "maka",
  "saat", "ketika", "sebelum", "sesudah", "setelah", "selama", "hingga",
  "sampai", "tentang", "mengenai", "terhadap", "bagaimana", "apa",
  "siapa", "mana", "kapan", "dimana", "kenapa", "mengapa", "berapa",
  "sebuah", "para", "sang", "si", "bu", "pak", "hal", "per", "setiap",
  "antara", "lain", "lainnya", "tersebut", "seperti", "yaitu", "yakni",
  "contoh", "misalnya", "berikut", "termasuk", "utama", "umum",
]);

// ─── Text Preprocessing ─────────────────────────────────────────────
/**
 * Melakukan preprocessing teks: lowercase, tokenisasi, dan stopword removal
 * @param text Teks input
 * @returns Array token yang sudah dibersihkan
 */
export function preprocessText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")          // Hapus karakter spesial
    .replace(/\d+/g, " ")              // Hapus angka
    .split(/\s+/)                      // Tokenisasi
    .filter((token) =>
      token.length > 1 &&              // Filter token terlalu pendek
      !STOPWORDS.has(token)            // Hapus stopwords
    );
}

// ─── TF (Term Frequency) ───────────────────────────────────────────
/**
 * Menghitung Term Frequency (TF) dari dokumen
 * TF(t, d) = jumlah kemunculan term t dalam dokumen d / total terms dalam dokumen d
 *
 * @param terms Array token dari dokumen
 * @returns Map dengan key = term, value = TF score
 */
export function computeTF(terms: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  const totalTerms = terms.length;

  if (totalTerms === 0) return tf;

  // Hitung frequency setiap term
  for (const term of terms) {
    tf.set(term, (tf.get(term) || 0) + 1);
  }

  // Normalisasi dengan total terms (raw TF)
  for (const [term, count] of tf) {
    tf.set(term, count / totalTerms);
  }

  return tf;
}

// ─── IDF (Inverse Document Frequency) ──────────────────────────────
/**
 * Menghitung Inverse Document Frequency (IDF) untuk seluruh corpus
 * IDF(t) = log(N / (1 + df(t)))
 *
 * N = total dokumen
 * df(t) = jumlah dokumen yang mengandung term t
 *
 * @param documents Array array token dari seluruh dokumen
 * @returns Map dengan key = term, value = IDF score
 */
export function computeIDF(documents: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const totalDocs = documents.length;

  if (totalDocs === 0) return idf;

  // Hitung document frequency (df) untuk setiap term
  const df = new Map<string, number>();

  for (const doc of documents) {
    // Gunakan Set untuk menghitung unique terms per dokumen
    const uniqueTerms = new Set(doc);
    for (const term of uniqueTerms) {
      df.set(term, (df.get(term) || 0) + 1);
    }
  }

  // Hitung IDF: log(N / (1 + df))
  // Penambahan 1 pada denominator untuk menghindari pembagian dengan 0
  for (const [term, freq] of df) {
    idf.set(term, Math.log(totalDocs / (1 + freq)));
  }

  return idf;
}

// ─── TF-IDF Vector ─────────────────────────────────────────────────
/**
 * Menghitung vektor TF-IDF untuk satu dokumen
 * TF-IDF(t, d) = TF(t, d) × IDF(t)
 *
 * @param tf TF scores dari dokumen
 * @param idf IDF scores dari corpus
 * @returns Map dengan key = term, value = TF-IDF score
 */
export function computeTFIDF(
  tf: Map<string, number>,
  idf: Map<string, number>
): Map<string, number> {
  const tfidf = new Map<string, number>();

  for (const [term, tfScore] of tf) {
    const idfScore = idf.get(term) || 0;
    tfidf.set(term, tfScore * idfScore);
  }

  return tfidf;
}

// ─── Cosine Similarity ─────────────────────────────────────────────
/**
 * Menghitung Cosine Similarity antara dua vektor
 * cos(θ) = (A · B) / (||A|| × ||B||)
 *
 * @param vecA Vektor pertama (query)
 * @param vecB Vektor kedua (dokumen)
 * @returns Nilai similarity antara 0 sampai 1
 */
export function cosineSimilarity(
  vecA: Map<string, number>,
  vecB: Map<string, number>
): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  // Hitung dot product dan norma vektor A
  for (const [term, value] of vecA) {
    const bValue = vecB.get(term) || 0;
    dotProduct += value * bValue;
    normA += value * value;
  }

  // Hitung norma vektor B
  for (const [, value] of vecB) {
    normB += value * value;
  }

  // Hitung cosine similarity
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

// ─── TF-IDF Search Engine ──────────────────────────────────────────
export interface SearchResult<T> {
  item: T;
  score: number;
  matchedTerms: string[];
}

/**
 * TF-IDF Search Engine untuk pencarian dokumen
 */
export class TFIDFEngine<T extends { id: string; content: string; keywords: string[] }> {
  private documents: T[];
  private processedDocs: string[][];
  private idf: Map<string, number>;
  private tfidfVectors: Map<string, Map<string, number>>;

  constructor(documents: T[]) {
    this.documents = documents;

    // Preprocess semua dokumen (gabung content + keywords)
    this.processedDocs = documents.map((doc) => {
      const contentTokens = preprocessText(doc.content);
      const keywordTokens = preprocessText(doc.keywords.join(" "));
      return [...contentTokens, ...keywordTokens];
    });

    // Hitung IDF sekali saat inisialisasi
    this.idf = computeIDF(this.processedDocs);

    // Pre-compute TF-IDF vectors untuk semua dokumen
    this.tfidfVectors = new Map();
    for (let i = 0; i < documents.length; i++) {
      const tf = computeTF(this.processedDocs[i]);
      const tfidf = computeTFIDF(tf, this.idf);
      this.tfidfVectors.set(documents[i].id, tfidf);
    }
  }

  /**
   * Mencari dokumen paling relevan berdasarkan query
   * @param query Query pencarian dari user
   * @param topK Jumlah hasil teratas yang dikembalikan (default: 8)
   * @returns Array hasil pencarian yang diurutkan berdasarkan skor
   */
  search(query: string, topK: number = 8): SearchResult<T>[] {
    // Preprocess query
    const queryTokens = preprocessText(query);

    if (queryTokens.length === 0) {
      return [];
    }

    // Hitung TF-IDF vektor untuk query
    const queryTF = computeTF(queryTokens);
    const queryTFIDF = computeTFIDF(queryTF, this.idf);

    // Hitung cosine similarity dengan setiap dokumen
    const results: SearchResult<T>[] = [];

    for (let i = 0; i < this.documents.length; i++) {
      const doc = this.documents[i];
      const docVector = this.tfidfVectors.get(doc.id);

      if (docVector) {
        const score = cosineSimilarity(queryTFIDF, docVector);

        // Cari terms mana yang match (untuk debugging/logging)
        const matchedTerms = queryTokens.filter((t) => docVector.has(t));

        if (score > 0) {
          results.push({
            item: doc,
            score,
            matchedTerms,
          });
        }
      }
    }

    // Urutkan berdasarkan skor (descending) dan ambil top K
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Menghitung IDF untuk term tertentu (untuk analisis)
   */
  getIDF(term: string): number {
    return this.idf.get(preprocessText(term)[0]) || 0;
  }

  /**
   * Mendapatkan total dokumen dalam index
   */
  getDocumentCount(): number {
    return this.documents.length;
  }
}
