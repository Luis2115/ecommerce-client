import React from "react";
import { Table, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import { updateProductStock } from "../../../../api/product";
import { updateOrder } from "../../../../api/order";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function BodyOrder(props) {
  const { order } = props;
  const { products } = order;
  const { logout } = useAuth();
  const router = useRouter();

  const handleClick = async (event) => {
    event.preventDefault();

    if (order.estado === true) {
      toast.error("El estado de la orden ya generado");
    } else {
      for (const product of products) {
        //console.log("id:" + product.id + "cantidad: " + product.cantidad);
        const response = await updateProductStock(
          product.id,
          product.cantidad,
          logout
        );

        if (!response) {
          console.log("Error al actualizar el stock del producto");
        } else {
          console.log("stock actualizado");
        }
      }

      const response = await updateOrder(order.id, true, logout);
      //console.log(response);

      if (size(response) > 0) {
        toast.success("Orden Actualizada");
        router.push("/admin");
      } else {
        toast.error("Error al actualizar la orden");
      }
    }
  };

  return (
    <div className="body-order">
      <div className="title">Lista de Productos</div>
      <div className="list-products">
        <Table celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Marca</Table.HeaderCell>
              <Table.HeaderCell>Cantidad</Table.HeaderCell>
            </Table.Row>
            {map(products, (product) => (
              <Table.Row key={product.id} className="list-products__product">
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category.title}</Table.Cell>
                <Table.Cell>{product.made}</Table.Cell>
                <Table.Cell>{product.cantidad}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body></Table.Body>
        </Table>
        <Button className="action" onClick={handleClick}>
          Proceder orden
        </Button>
      </div>
    </div>
  );
}
