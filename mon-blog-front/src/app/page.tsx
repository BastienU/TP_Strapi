// src/app/page.tsx
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";
import AuthButton from "@/app/AuthButton";

export default async function Home() {
  const data = await fetchAPI("/articles");
  const articles = data.data;

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <AuthButton />
      </div>

      <main className="main">
        {articles.map((article: any) => {
          const coverUrl = getStrapiMedia(
            article.coverImage?.formats?.medium?.url || article.coverImage?.url
          );

          return (
            <a key={article.id} href={`/articles/${article.slug}`} className="article-card">
              <img
                src={coverUrl}
                alt={article.coverImage?.alternativeText || article.title}
                className="article-image"
              />
              <h2 className="article-title">{article.title}</h2>
              <p className="article-author">Par {article.authorName}</p>
              <p className="article-date">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </a>
          );
        })}
      </main>
    </div>
  );
}