const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.papers237.duckdns.org/api/v1";

export interface ApiBook {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverUrl: string | null;
  price: number;
  pageCount: number | null;
  language: string | null;
  author: {
    id: string;
    penName: string | null;
    user: { firstName: string; lastName: string; avatarUrl: string | null };
  };
  _count: { reviews: number };
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  _count: { books: number };
  children?: ApiCategory[];
}

export async function fetchBooks(params: {
  page?: number;
  limit?: number;
  q?: string;
  categoryId?: string;
} = {}): Promise<{ books: ApiBook[]; total: number }> {
  try {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.q) searchParams.set("q", params.q);
    if (params.categoryId) searchParams.set("categoryId", params.categoryId);

    const res = await fetch(`${API_URL}/books?${searchParams.toString()}`);
    if (!res.ok) return { books: [], total: 0 };

    const json = await res.json();
    return {
      books: json.data ?? [],
      total: json.pagination?.total ?? 0,
    };
  } catch {
    return { books: [], total: 0 };
  }
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) return [];

    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function fetchStats(): Promise<{ totalBooks: number; totalAuthors: number }> {
  try {
    const [booksRes, authorsRes] = await Promise.all([
      fetch(`${API_URL}/books?limit=1`),
      fetch(`${API_URL}/authors?limit=1`),
    ]);

    let totalBooks = 0;
    let totalAuthors = 0;

    if (booksRes.ok) {
      const json = await booksRes.json();
      totalBooks = json.pagination?.total ?? 0;
    }
    if (authorsRes.ok) {
      const json = await authorsRes.json();
      totalAuthors = json.pagination?.total ?? 0;
    }

    return { totalBooks, totalAuthors };
  } catch {
    return { totalBooks: 0, totalAuthors: 0 };
  }
}
