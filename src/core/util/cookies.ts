export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

export function setCookie(name: string, value: string, days = 1): void {
  if (typeof document === "undefined") return;

  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}`;
}

export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
