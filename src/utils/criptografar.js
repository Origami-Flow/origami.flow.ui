import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const encryptText = (text) => {
    const secretKey = "your-secret-key";
    return CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
};