import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import router, { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getProductByUrl } from "../api/product";
import { getMeApi } from "../api/user";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import SumaryCart from "../components/Cart/SumaryCart";
import { createOrderApi, removeAllProductsCart } from "../api/cart";
import { toast } from "react-toastify";
import { size } from "lodash";

export default function Cart() {
  const { getProductCart, removeAllProductCart } = useCart();
  const { auth, logout } = useAuth();
  //console.log(idUser);
  const products = getProductCart();
  const router = useRouter();

  return !products ? (
    <EmptyCart />
  ) : (
    <FullCart products={products} auth={auth} logout={logout} />
  );
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}

function FullCart(props) {
  const { products, auth, logout } = props;
  const [loading, setLoading] = useState(false);
  const [infoUser, setInfoUser] = useState(undefined);
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  //   console.log(productsData);

  //carga los datos, en caso el usuario inicie sesion
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setInfoUser(response || null);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      //se crea un for asincrono el cual se ejecutar solo cuando tenga toda la informacion lista
      for await (const product of products) {
        //obetemos la info del producto mediante la funcion getProductByUrl
        const data = await getProductByUrl(product);
        //guardamos la data en el array temporal de productos
        productsTemp.push(data);
      }
      //seteamos los productostemporales en el estado
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await createOrderApi(
      productsData,
      auth.idUser,
      infoUser.phone,
      logout
    );

    if (size(response) > 0) {
      toast.success("Orden creada");
      removeAllProductsCart();
      router.push("/orders");
    } else {
      toast.error("Error al generar la orden");
    }

    setLoading(false);
  };

  return (
    <BasicLayout className="cart">
      <SumaryCart products={productsData} setReloadCart={setReloadCart} />
      {productsData && (
        <Button onClick={handleClick} loading={loading}>
          Realizar Consulta
        </Button>
      )}
    </BasicLayout>
  );
}
