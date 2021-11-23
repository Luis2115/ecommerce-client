import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { size, map } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getOrdersApi } from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order/Order";
import Seo from "../components/Seo";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <Seo
        title="Mis pedidos"
        description="Listado de todas las ordenes generadas por el usuario"
      />
      <div className="orders__block">
        <div className="title">Mis Pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              No cuentas con alguna consulta de orden
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList(props) {
  const { orders } = props;

  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} tablet={6} computer={8} key={order.id}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
