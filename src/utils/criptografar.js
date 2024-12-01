import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const encryptText = (text) => {
  return CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
};

export const decryptText = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
