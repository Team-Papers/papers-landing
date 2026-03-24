import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.papers237.duckdns.org/api/v1";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/authors/${id}`, { next: { revalidate: 300 } });
    if (!res.ok) return { title: "Auteur | Papers" };
    const json = await res.json();
    const author = json.data;
    if (!author) return { title: "Auteur | Papers" };

    const name = author.penName || `${author.user?.firstName ?? ""} ${author.user?.lastName ?? ""}`.trim();

    return {
      title: `${name} | Papers Auteurs`,
      description: author.bio?.slice(0, 160) || `Decouvrez les livres de ${name} sur Papers.`,
      openGraph: {
        title: name,
        description: author.bio?.slice(0, 160) || undefined,
        images: (author.photoUrl || author.user?.avatarUrl) ? [{ url: author.photoUrl || author.user?.avatarUrl }] : undefined,
      },
    };
  } catch {
    return { title: "Auteur | Papers" };
  }
}

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
