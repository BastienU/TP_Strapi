"use client";
import { useState, useEffect } from "react";

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("jwt");
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <button style={{ padding: "8px 16px", marginBottom: "16px" }} onClick={handleClick}>
      {isLoggedIn ? "Déconnexion" : "Connexion"}
    </button>
  );
}