import CryptoJS from "crypto-js";
import {CustomError} from "../middleware/ExceptionHandler.middleware";
const encryptToken = (token: string | CryptoJS.lib.WordArray) => {
  try {
    return CryptoJS.AES.encrypt(token, process.env.TOKEN_SECRET || '').toString();
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(500, error.message, {layer: 'UTILS', methodName: 'encryptToken'});
    }
    throw new CustomError(500, 'An unknown error occurred', {layer: 'UTILS', methodName: 'encryptToken'});
  }
}

const decryptToken = (encryptedToken: string | CryptoJS.lib.CipherParams) => {
  try{
    const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.TOKEN_SECRET || '');
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(500, error.message, {layer: 'UTILS', methodName: 'decryptToken'});
    }
    throw new CustomError(500, 'An unknown error occurred', {layer: 'UTILS', methodName: 'decryptToken'});
  }
}

export {
  encryptToken,
  decryptToken
};
