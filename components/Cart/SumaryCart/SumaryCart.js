import React, { useState, useEffect } from "react";
import { Table, Image, Icon, Button } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function SumaryCart(props) {
  const { products, setReloadCart, setProductsData } = props;
  const { removeProductCart } = useCart();

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  const onAdd = (productAdd) => {
    const exist = products.find((x) => x.id === productAdd.id);
    // console.log(exist);

    if (exist) {
      if (exist.hasOwnProperty("cantidad")) {
        setProductsData(
          map(products, (product1) =>
            product1.id === productAdd.id
              ? { ...exist, cantidad: exist.cantidad + 1 }
              : product1
          )
        );
      } else {
        setProductsData(
          map(products, (product1) =>
            product1.id === productAdd.id ? { ...exist, cantidad: 1 } : product1
          )
        );
      }
    } else {
      setProductsData([...products, { ...productAdd, cantidad: 1 }]);
    }
  };

  const onRemove = (productRemove) => {
    const exist = products.find((x) => x.id === productRemove.id);
    if (exist.hasOwnProperty("cantidad")) {
      if (exist.cantidad === 1) {
        setProductsData(products.filter((x) => x.id !== productRemove.id));
        removeProduct(productRemove.url);
      } else {
        setProductsData(
          map(products, (product1) =>
            product1.id === productRemove.id
              ? { ...exist, cantidad: exist.cantidad - 1 }
              : product1
          )
        );
      }
    } else {
      setProductsData(products.filter((x) => x.id !== productRemove.id));
      removeProduct(productRemove.url);
    }
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
              <Table.Row key={product.title} className="summary-cart__product">
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
                <Table.Cell>
                  <Button
                    size="tiny"
                    onClick={() => onRemove(product)}
                    className="remove"
                  >
                    -
                  </Button>
                  {product.cantidad}
                  <Button
                    size="tiny"
                    onClick={() => onAdd(product)}
                    className="add"
                  >
                    +
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
