import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import {
  getProductsCategoryApi,
  getTotalCategoryApi,
  getProductsPromotionApi,
  getTotalProductsPromotionApi,
} from "../../api/product";
import ListProducts from "../../components/ListProducts";
import Pagination from "../../components/Pagination/Pagination";

//limite de productos por pagina
const limitPerPage = 20;

export default function Category() {
  const { query } = useRouter();
  const [products, setProducts] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [productsPromotion, setProductsPromotion] = useState(null);
  const [totalProductsPromotion, setTotalProductsPromotion] = useState(null);

  //funcion para saber a partir de que producto mostrar en la paginacion
  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

  //efecto que permitira renderizar los productos de cada categoria
  useEffect(() => {
    (async () => {
      if (query.category) {
        const response = await getProductsCategoryApi(
          query.category,
          limitPerPage,
          getStartItem()
        );
        //llenamos el array de productos para renderizar lo
        setProducts(response);
        // console.log(products);
      }
    })();
  }, [query]);

  //efecto que nos traera el total de productos por categoria
  useEffect(() => {
    (async () => {
      const response = await getTotalCategoryApi(query.category);
      //console.log(response);
      setTotalProducts(response);
    })();
  }, [query]);

  //efecto que permitira renderizar los productos de cada promocion
  useEffect(() => {
    (async () => {
      const response = await getProductsPromotionApi(
        true,
        limitPerPage,
        getStartItem()
      );
      //llenamos el array de productos en promocion para renderizar lo
      setProductsPromotion(response);
      // console.log(query.category);
      // console.log(productsPromotion);
    })();
  }, [query]);

  //efecto que nos traera el total de productos por promociones
  useEffect(() => {
    (async () => {
      const response = await getTotalProductsPromotionApi(true);
      //console.log(response);
      setTotalProductsPromotion(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="category">
      {query.category === "promociones" ? (
        <ProductPromotion
          productsPromotion={productsPromotion}
          totalProductsPromotion={totalProductsPromotion}
          query={query}
        />
      ) : (
        <ProductNormal
          products={products}
          totalProducts={totalProducts}
          query={query}
        />
      )}
    </BasicLayout>
  );
}

//Funcion para renderizar los productos por categorias
function ProductNormal(props) {
  const { products, totalProducts, query } = props;
  return (
    <>
      {!products && <Loader active>Cargando Productos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No hay productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
      {totalProducts ? (
        <Pagination
          totalProducts={totalProducts}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </>
  );
}

//funcion para renderizar los productos por promociones
function ProductPromotion(props) {
  const { productsPromotion, totalProductsPromotion, query } = props;
  return (
    <>
      {!productsPromotion && (
        <Loader active>Cargando Productos en Promocion</Loader>
      )}
      {productsPromotion && size(productsPromotion) === 0 && (
        <div>
          <h3>No hay productos</h3>
        </div>
      )}
      {size(productsPromotion) > 0 && (
        <ListProducts products={productsPromotion} />
      )}
      {totalProductsPromotion ? (
        <Pagination
          totalProducts={totalProductsPromotion}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </>
  );
}
