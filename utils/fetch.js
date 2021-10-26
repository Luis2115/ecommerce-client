import { getToken, hasExpiredToken } from "../api/token";

/*
funcion creada con el fin de poder realizar peticiones protegidas al servidor,
solo cuando el usuario este logueado podra realizar la peticion, mientras tanto
no podra realizar la
*/
export async function authFetch(url, params, logout) {
  const token = getToken();

  if (!token) {
    //usuario no logueado
    logout();
  } else {
    if (hasExpiredToken(token)) {
      //token caducado
      logout();
    } else {
      //token sin caducar
      const paramsTemp = {
        ...params,
        headers: { ...params?.headers, Authorization: `Bearer ${token}` },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
}
