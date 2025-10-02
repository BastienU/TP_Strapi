import ArticleClient from "./ArticleClient";
import { fetchAPI } from "@/lib/api";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = params.slug;
  const data = await fetchAPI(`/articles?filters[slug][$eq]=${slug}`);
  const article = data.data?.[0] || null;

  if (!article) {
    return <p>Article introuvable</p>;
  }

  return <ArticleClient article={article} />;
}