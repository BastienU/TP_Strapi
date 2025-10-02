"use client";

import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
        });

        if (!res.ok) {
        const err = await res.json();
        setError(err.error?.message || "Erreur inconnue");
        return;
        }

        const data = await res.json();
        localStorage.setItem("jwt", data.jwt); // Stocker le JWT
        setError("");
        window.location.href = "/";
    } catch (err) {
        setError("Impossible de se connecter. Réessayez plus tard.");
    }
    };

  return (
    <main className="login-page">
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

      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}