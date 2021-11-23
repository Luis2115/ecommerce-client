import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { size, map } from "lodash";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";

export default function Order(props) {
  const { order } = props;
  const { products, createdAt, estado } = order;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <div>
              <h2>Orden Creada</h2>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <p className="order__other-status">
              Estado: {estado === false ? "Hola" : "que tal"}
            </p>
            <Icon
              name="eye"
              circular
              link
              onClick={() => setShowModal(true)}
            ></Icon>
          </div>
        </div>
      </div>
      <ListProductsModal
        showModal={showModal}
        setShowModal={setShowModal}
        products={products}
      />
    </>
  );
}

function ListProductsModal(props) {
  const { showModal, setShowModal, products } = props;

  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title="Lista de productos"
    >
      <h3>Los productos consultados son:</h3>
      <div>
        {map(products, (product) => (
          <p key={product.title}> {product.title} </p>
        ))}
      </div>
    </BasicModal>
  );
}
