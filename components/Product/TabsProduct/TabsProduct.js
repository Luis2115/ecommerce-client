import React from "react";
import { Tab } from "semantic-ui-react";

export default function TabsProduct(props) {
  const { product } = props;

  const panes = [
    {
      menuItem: "Información",
      render: () => (
        <Tab.Pane>
          <h1>Info Product</h1>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Comentarios",
      render: () => (
        <Tab.Pane>
          <h1>Lista de Comentarios</h1>
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tab-product" panes={panes} />;
}
