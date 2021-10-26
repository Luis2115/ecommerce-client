import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

//funcion que guardara el token en el localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

//funcion que retornara el token almacenado en el localStorage
export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}

//funcion que verificara si el token ha expirado
export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  //obtenemos la fecha de expiracion y lo multiplicamos por 1000 milisegundos
  const expireDate = tokenDecode.exp * 1000;
  //obtenemos la fecha actual
  const currentDate = new Date().getTime();
  if (currentDate > expireDate) {
    return true;
  }
  return false;
}
