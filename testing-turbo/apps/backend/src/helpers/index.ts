// import { getEmbeddings } from "./getEmbeddings.js";
// import { cleanText } from "./textCleaning.js";
// import { tokenVerification } from "./tokenVerification.js";

const isValid = (str: string, type = "string") => {
  if (!str || str?.length > 250 || typeof str !== type) {
    return false;
  }
  return true;
};

export { isValid }; //, tokenVerification };
