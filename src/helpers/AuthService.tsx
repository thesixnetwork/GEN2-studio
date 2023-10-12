import CryptoJS from "crypto-js";
import _ from "lodash"
import jwt_decode from 'jwt-decode';




// cryptoService.--------------------------------------------------------

const secretKey = 'b0f4ccdf-525d-473c-9315-a0907095e0c5';

export const encryptWithAES = (text : string) => {
  const cipherText = CryptoJS.AES.encrypt(text, secretKey).toString();
  return cipherText;
};

// export const decryptWithAES = (cipherText :string) => {
//   const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//   const originalText = bytes.toString(CryptoJS.enc.Utf8);
//   return originalText;
// };

// export const encryptWithAES = (text: string, key: string) => {
//   return CryptoJS.AES.encrypt(text, key).toString();
// };

export const decryptWithAES = (ciphertext: string) => {
  if (_.isEmpty(ciphertext) === false) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } else {
    return ciphertext;
  }
};

// localStorageService.--------------------------------------------------------


const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const ORIGIN_CONTRACT_ADDRESS='origin_contract_address';
const SCHEMA_CODE ="SCHEMA_CODE";

export const saveTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  const encryptedAccessToken = encryptWithAES(accessToken);
  const encryptedRefreshToken = encryptWithAES(refreshToken);
  console.log("EncryptedAccessToken:",encryptedAccessToken)
  localStorage.setItem(ACCESS_TOKEN_KEY, encryptedAccessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, encryptedRefreshToken);
};

export const saveOriginContractAddressToLocalStorage =(OriginContractAddress :string)=>{
  localStorage.setItem(ORIGIN_CONTRACT_ADDRESS,OriginContractAddress );
}

export const saveSCHEMA_CODE =(schema_code :string)=>{
  localStorage.setItem(SCHEMA_CODE,schema_code );
}

export const getSCHEMA_CODE=()=>{
  return localStorage.getItem(SCHEMA_CODE)
}

export const getOriginContractAddressFromLocalStorage=()=>{
  return localStorage.getItem(ORIGIN_CONTRACT_ADDRESS)
}

export const getAccessTokenFromLocalStorage = () => {
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  return encryptedAccessToken ? decryptWithAES(encryptedAccessToken) : null;
};

export const getRefreshTokenFromLocalStorage = () => {
  const encryptedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return encryptedRefreshToken ? decryptWithAES(encryptedRefreshToken) : null;
};

export const clearTokensFromLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// authService.------------------------------------------------------------------------------------

export const isAccessTokenExpired = () => {
  const accessToken = getAccessTokenFromLocalStorage();
  if (!accessToken) {
    return true; // No access token available, consider it expired
  }

  const decodedToken = jwt_decode(accessToken);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

  return decodedToken.exp < currentTime;
};
