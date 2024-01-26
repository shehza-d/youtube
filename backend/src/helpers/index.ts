// import { getEmbeddings } from "./getEmbeddings.js";
// import { cleanText } from "./textCleaning.js";
// import { tokenVerification } from "./tokenVerification.js";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // testing left

const isValid = (str: string, type = "string") => {
  if (!str || str?.length > 250 || typeof str !== type) {
    return false;
  }
  return true;
};

export { isValid }; //, tokenVerification };
