import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import useCart from "../../../hooks/useCart";

export default function HeaderProduct(props) {
  const { product } = props;
  const { title, poster } = product;
  //console.log(product);

  return (
    <Grid className="header-product">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info product={product} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const { product } = props;
  const { title, made, unit, url } = product;
  const { addProductCart } = useCart();

  return (
    <>
      <div className="header-product__title">{title}</div>
      <div className="header-product__available">
        Consultar la disponibilidad 24/7
      </div>
      <div className="header-product__sumary">
        <p>Marca del Producto: {made}</p>
        <p>Presentación: {unit}</p>
      </div>
      <div className="header-product__actions">
        <Button
          className="header-product__actions-btn"
          onClick={() => addProductCart(url)}
        >
          Pre-Compra
        </Button>
      </div>
    </>
  );
}
