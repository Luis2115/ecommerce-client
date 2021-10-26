import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { setToken, getToken, removeToken } from "../api/token";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

  //verificamos si el usuario esta logeado por medio del token que retorna la funcion getToken
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({ token, idUser: jwtDecode(token).id });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    //guardamos el token en el localStorage mediante la funcion setToken
    setToken(token);
    setAuth({ token, idUser: jwtDecode(token).id });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  //se hace uso del hook useMemo, el cual nos permitira memorizar los datos que se le ingresen
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  //Comprobamos si el useEffect verifico al usuario logeado
  if (auth === undefined) return null;

  //se engloba a todo el proyecto con el contexto creado y se le pasa los valores de que contenga authData
  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
