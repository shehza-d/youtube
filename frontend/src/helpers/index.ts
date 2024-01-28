export const getUrl = () => {
  const isProduction = window.location.href.includes("https");

  const baseUrl = isProduction ? "hkikik" : "http://localhost:3003";
  return baseUrl;
};

export const constructFormData = (obj: Object) => {
  // Takes object and return formData instance of it
  // Only files and string can be sent in FormData
  const formData = new FormData(); // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

  for (const fields in obj) {
    // @ts-ignore // remove ignore
    formData.append(fields, obj[fields]);
  }

  return formData;
};
