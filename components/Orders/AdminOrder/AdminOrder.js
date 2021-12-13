import React, { useState, useEffect } from "react";
import { Table, Icon, Menu } from "semantic-ui-react";
import { map } from "lodash";
import moment from "moment";
import Link from "next/link";

export default function AdminOrder(props) {
  const { orders } = props;

  return (
    <>
      <div className="admin-orders">
        <div className="title">Gestionar Ordenes</div>
        <div className="data">
          <Table celled selectable sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>N°</Table.HeaderCell>
                <Table.HeaderCell>Orden</Table.HeaderCell>
                <Table.HeaderCell>Usuario</Table.HeaderCell>
                <Table.HeaderCell>Celular</Table.HeaderCell>
                <Table.HeaderCell>Fecha</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Ver</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {map(orders, (order) => (
                <Table.Row key={order.id} className="admin-orders__order">
                  <Table.Cell>{}</Table.Cell>
                  <Table.Cell>{order.id}</Table.Cell>
                  <Table.Cell>{order.user.name}</Table.Cell>
                  <Table.Cell>{order.user.phone}</Table.Cell>
                  <Table.Cell>{moment(order.createdAt).format("L")}</Table.Cell>
                  <Table.Cell>
                    {order.estado ? "Revisada" : "Sin revisar"}
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/order/${order.id}`}>
                      <a>
                        <Icon name="eye" link />
                      </a>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
