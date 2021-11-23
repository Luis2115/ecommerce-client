import React, { useState, useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token";
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart,
} from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
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

  //efecto que asignara el total de productos en el carrito, y se ejecutara cuando el reloadCart cambie o el auth
  useEffect(() => {
    setTotalProductsCart(countProductsCart);
    setReloadCart(false);
  }, [reloadCart, auth]);

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

  //Funcion que se encargara de agregar un producto al carrito si el usuario esta logeado
  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(true); //refrescamos el contador del carrito mediante un reload
    } else {
      toast.warning("Para añadir un producto al carrito debes iniciar sesión");
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
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

  //se hace uso del hook useMemo, para memorizar los datos del cart
  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );

  //Comprobamos si el useEffect verifico al usuario logeado
  if (auth === undefined) return null;

  //se engloba a todo el proyecto con el contexto creado y se le pasa los valores de que contenga authData
  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
