import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";
import Seo from "../../components/Seo";
import { getOrderIdApi } from "../../api/order";
import HeaderOrder from "../../components/Orders/AdminOrder/HeaderOrder";
import BodyOrder from "../../components/Orders/AdminOrder/BodyOrder";

export default function Order() {
  const [order, setOrder] = useState(null);
  const { query } = useRouter();
  // console.log(query);

  useEffect(() => {
    (async () => {
      const response = await getOrderIdApi(query.order);
      setOrder(response);
    })();
  }, [query]);

  if (!order) return null;

  return (
    <BasicLayout className="orderr">
      <Seo
        title={`Orden del usuario: ${order.user.name}`}
        description="Pagina que contiene la información del producto"
      />
      <HeaderOrder order={order} />
      <BodyOrder order={order} />
    </BasicLayout>
  );
}
