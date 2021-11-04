import React from "react";
import { map } from "lodash";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../utils/breakpoint";

export default function ListProducts(props) {
  const { products } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-products">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(products, (product) => (
            <Product key={product.title} products={product} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Product(props) {
  const { products } = props;
  //<h3 key={products.title}>{products.title}</h3>;

  return (
    <Grid.Column className="list-products__product">
      <Link href={`/${products.url}`}>
        <a>
          <div className="list-products__product-poster">
            <Image src={products.poster.url} alt={products.title} />
            <div className="list-products__product-poster-info">
              {products.made ? (
                <span className="made">{products.made}</span>
              ) : (
                <span />
              )}
            </div>
          </div>
          <h2>{products.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
