import React from "react";
import Head from "next/head";

export default function Seo(props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Regenda - Tienda Online",
  description:
    "Encontraras todos los productos con los que cuente la empresa, con el fin de realizar una consulta de stock",
};
