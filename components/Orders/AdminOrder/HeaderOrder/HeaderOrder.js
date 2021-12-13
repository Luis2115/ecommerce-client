import React from "react";

export default function HeaderOrder(props) {
  const { order } = props;
  const { id, phone, user, estado } = order;
  const { name, lastname } = user;

  return (
    <div className="header-order">
      <div className="title">Detalles de la orden</div>
      <div className="info">
        <h2 className="info__id">Identificador: {id}</h2>
        <div className="info__user">
          <h3>Usuario: {name + " " + lastname} </h3>
          <h3>Celular: {phone}</h3>
        </div>
      </div>
    </div>
  );
}
