import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getProductByUrl } from "../api/product";
import useCart from "../hooks/useCart";
import SumaryCart from "../components/Cart/SumaryCart";

export default function Cart() {
  const { getProductCart } = useCart();
  const products = getProductCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}

function FullCart(props) {
  const { products } = props;
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  //   console.log(productsData);

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

  return (
    <BasicLayout className="cart">
      <SumaryCart products={productsData} setReloadCart={setReloadCart} />
    </BasicLayout>
  );
}
