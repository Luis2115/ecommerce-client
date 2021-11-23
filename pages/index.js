import React, { useState, useEffect } from "react";
import { size, map } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastProductApi } from "../api/product";
import { Loader } from "semantic-ui-react";
import ListProducts from "../components/ListProducts/ListProducts";
import Seo from "../components/Seo";

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductApi(20);
      if (size(response) > 0) {
        setProducts(response);
        //console.log(response);
      } else {
        setProducts([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo />
      {!products && <Loader active>Cargando Productos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No hay Productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
    </BasicLayout>
  );
}
