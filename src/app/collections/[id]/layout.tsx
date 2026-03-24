import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.papers237.duckdns.org/api/v1";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/collections/${id}`, { next: { revalidate: 300 } });
    if (!res.ok) return { title: "Collection | Papers" };
    const json = await res.json();
    const col = json.data;
    if (!col) return { title: "Collection | Papers" };

    return {
      title: `${col.name} | Papers Collections`,
      description: col.description?.slice(0, 160) || `Decouvrez la collection "${col.name}" sur Papers.`,
    };
  } catch {
    return { title: "Collection | Papers" };
  }
}

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
