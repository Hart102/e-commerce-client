export const api = "http://localhost:3000";

const getTokenFromCookieStorage = () => {
  const cookies = document.cookie.split(";");
  const cookieMap: Record<string, string> = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookieMap[name] = value;
  });
  return cookieMap;
};

export const token = getTokenFromCookieStorage()["online_store"];
