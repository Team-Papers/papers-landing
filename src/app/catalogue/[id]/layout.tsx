import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.papers237.duckdns.org/api/v1";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/books/${id}`, { next: { revalidate: 300 } });
    if (!res.ok) return { title: "Livre | Papers" };
    const json = await res.json();
    const book = json.data;
    if (!book) return { title: "Livre | Papers" };

    const authorName = book.author?.penName || `${book.author?.user?.firstName ?? ""} ${book.author?.user?.lastName ?? ""}`.trim();

    return {
      title: `${book.title} - ${authorName} | Papers`,
      description: book.description?.slice(0, 160) || `Decouvrez "${book.title}" par ${authorName} sur Papers.`,
      openGraph: {
        title: book.title,
        description: book.description?.slice(0, 160) || undefined,
        images: book.coverUrl ? [{ url: book.coverUrl }] : undefined,
      },
    };
  } catch {
    return { title: "Livre | Papers" };
  }
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
