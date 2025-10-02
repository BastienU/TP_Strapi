const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";

export async function fetchAPI(path: string, options: RequestInit = {}) {
  const url = path.startsWith("/") ? `${API_URL}${path}` : `${API_URL}/${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erreur API :", res.status, errorText);
    throw new Error(`Erreur API : ${res.status}`);
  }

  return res.json();
}