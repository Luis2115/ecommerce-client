import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";

export default function Order(props) {
  const { order } = props;
  const { product, createdAt, phone } = order;
  const { title, poster, url } = product;

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title}></Image>
              </a>
            </Link>
            <div>
              <h2> {title} </h2>
              <p>{phone}</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            Estado
          </div>
        </div>
      </div>
    </>
  );
}
