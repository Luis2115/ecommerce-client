import React, { useState, useEffect } from "react";
import AdminOrder from "../components/Orders/AdminOrder/AdminOrder";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getOrdersAllApi, getTotalOrderApi } from "../api/order";
import Seo from "../components/Seo";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import { useRouter } from "next/router";
import Pagination from "../components/Pagination/Pagination";

// limite de ordenes por pagina
const limitPerPage = 10;

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const { logout } = useAuth();
  const { query } = useRouter();
  const [totalOrders, setTotalOrders] = useState(null);

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      const response = await getOrdersAllApi(
        logout,
        limitPerPage,
        getStartItem()
      );
      setOrders(response || []);
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalOrderApi();
      setTotalOrders(response);
    })();
  }, [query]);

  return (
    <BasicLayout>
      <Seo
        title="Gestionar Ordenes"
        description="Pagina en la que solo el administrador podra gestionar las ordenes que se hayan generado en la empresa"
      />
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <AdminOrder orders={orders} />
          {totalOrders ? (
            <Pagination
              totalProducts={totalOrders}
              page={query.page ? parseInt(query.page) : 1}
              limitPerPage={limitPerPage}
            />
          ) : null}
        </Grid.Column>
      </Grid>
    </BasicLayout>
  );
}
