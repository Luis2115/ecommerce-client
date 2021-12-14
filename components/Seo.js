import React from "react";
import Head from "next/head";

export default function Seo(props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <link rel="manifest" href="/manifest.json" />

      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });

            `,
        }}
      />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Regenda - Tienda Online",
  description:
    "Encontraras todos los productos con los que cuente la empresa, con el fin de realizar una consulta de stock",
};
