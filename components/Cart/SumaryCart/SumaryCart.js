import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function SumaryCart(props) {
  const { products, setReloadCart } = props;
  const { removeProductCart } = useCart();

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Marca</Table.HeaderCell>
              <Table.HeaderCell>Unidad</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image src={product.poster.url} alt={product.title} />
                  {product.title}
                </Table.Cell>
                <Table.Cell> {product.category.title} </Table.Cell>
                <Table.Cell> {product.made} </Table.Cell>
                <Table.Cell> {product.unit} </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
