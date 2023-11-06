export const getUrl = () => {
  const isProduction = window.location.href.includes("https");

  const baseUrl = isProduction
    ? "hkikik"
    : "http://localhost:3003";
  return baseUrl;
};
