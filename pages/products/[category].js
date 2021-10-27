import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { useRouter } from "next/router";

export default function Category() {
  const { query } = useRouter();

  return (
    <BasicLayout className="category">
      <h1>Estamos en categoria: {query.category}</h1>
    </BasicLayout>
  );
}
