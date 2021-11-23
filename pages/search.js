import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchProductApi } from "../api/product";
import ListProducts from "../components/ListProducts";
import Seo from "../components/Seo";

export default function search() {
  const [products, setProducts] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-product").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchProductApi(query.query);
        console.log(response);
        if (size(response) > 0) setProducts(response);
        else setProducts([]);
      } else {
        setProducts([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      <Seo
        title={`Buscando: ${query.query}`}
        description="Pagina del buscador de la tienda"
      />
      {!products && <Loader active>Cargando Productos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No se han encontrado productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
    </BasicLayout>
  );
}
