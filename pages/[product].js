import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getProductByUrl } from "../api/product";
import HeaderProduct from "../components/Product/HeaderProduct";
import TabsProduct from "../components/Product/TabsProduct";
import Seo from "../components/Seo";

export default function Product() {
  const [product, setProduct] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getProductByUrl(query.product);
      setProduct(response);
    })();
  }, [query]);

  if (!product) return null;

  //implementacion a futuro los tabs

  return (
    <BasicLayout classname="product">
      <Seo
        title={product.title}
        description="Pagina que contiene la información del producto"
      />
      <HeaderProduct product={product} />
      <TabsProduct product={product} />
    </BasicLayout>
  );
}
