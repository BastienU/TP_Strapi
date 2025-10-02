"use client";

import { useState, useEffect } from "react";
import { getStrapiMedia } from "@/lib/media";
import "./article.css";

interface Comment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage?: any;
  authorName: string;
  publishedAt: string;
}

export default function ArticleClient({ article }: { article: Article }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:1337/api/comments?filters[article]=${article.id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data || []))
      .catch(() => setError("Impossible de récupérer les commentaires"));
  }, [article.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("Vous devez être connecté pour commenter.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:1337/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            authorName: name,
            content,
            article: article.id,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error?.message || "Impossible d'envoyer le commentaire");
        return;
      }

      const newComment = await res.json();
      setComments([...comments, newComment.data]);
      setName("");
      setContent("");
      setError("");
    } catch (err) {
      setError("Erreur lors de l'envoi du commentaire.");
    }
  };

  const coverUrl = getStrapiMedia(
    article.coverImage?.formats?.medium?.url || article.coverImage?.url
  );

  return (
    <main className="article-page">
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#333",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Retour
        </button>
      </div>

      {coverUrl && <img src={coverUrl} alt={article.title} className="cover" />}
      <h1 className="title">{article.title}</h1>
      <p className="meta">
        Par {article.authorName} | {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <div className="content" dangerouslySetInnerHTML={{ __html: article.content }} />

      <section className="comments">
        <h2>Commentaires</h2>
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <strong>{c.authorName}</strong>{" "}
            <em>({new Date(c.createdAt).toLocaleDateString()})</em>
            <p>{c.content}</p>
          </div>
        ))}
      </section>

      <section className="comment-form">
        <h2>Laisser un commentaire</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Votre commentaire"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Envoyer</button>
          {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
        </form>
      </section>
    </main>
  );
}