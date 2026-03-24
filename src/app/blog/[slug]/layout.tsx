import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.papers237.duckdns.org/api/v1";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_URL}/blog/slug/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return { title: "Article | Papers" };
    const json = await res.json();
    const article = json.data;
    if (!article) return { title: "Article | Papers" };

    return {
      title: `${article.title} | Papers Blog`,
      description: article.excerpt?.slice(0, 160) || article.content?.slice(0, 160) || undefined,
      openGraph: {
        title: article.title,
        description: article.excerpt?.slice(0, 160) || undefined,
        images: article.coverImageUrl ? [{ url: article.coverImageUrl }] : undefined,
      },
    };
  } catch {
    return { title: "Article | Papers" };
  }
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
