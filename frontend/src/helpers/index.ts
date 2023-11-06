export const getUrl = () => {
  const isProduction = window.location.href.includes("https");

  const baseUrl = isProduction
    ? "https://products-api-dot-learning-chatbot-393109.lm.r.appspot.com"
    : "http://localhost:3003";
  return baseUrl;
};
