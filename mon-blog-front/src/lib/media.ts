const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getStrapiMedia(path?: string) {
  if (!path) return "/default-thumbnail.jpg";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}