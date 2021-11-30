import React, { useState } from "react";
import { Icon, Image, Grid } from "semantic-ui-react";
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
      <Grid className="order">
        <Grid.Column mobile={16} tablet={6} computer={5}>
          <InfoProd />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={11}>
          <DetailProd
            createdAt={createdAt}
            estado={estado}
            setShowModal={setShowModal}
          />
        </Grid.Column>
      </Grid>

      <ListProductsModal
        showModal={showModal}
        setShowModal={setShowModal}
        products={products}
      />
    </>
  );
}

function InfoProd() {
  return (
    <div className="order__info">
      <div className="order__info-data">
        <div>
          <h2>Orden Creada</h2>
        </div>
      </div>
    </div>
  );
}

function DetailProd(props) {
  const { createdAt, estado, setShowModal } = props;

  return (
    <div className="order__other">
      <p className="order__other-date">
        {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
      </p>
      <p className="order__other-status">
        Estado: {estado === false ? "Hola" : "que tal"}
      </p>
      <Icon name="eye" circular link onClick={() => setShowModal(true)}></Icon>
    </div>
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
