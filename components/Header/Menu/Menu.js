import React, { useState, useEffect } from "react";
import {
  Container,
  Menu,
  Grid,
  Icon,
  Label,
  Dropdown,
} from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth/Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";
import { getCategoryApi } from "../../../api/category";

export default function MenuWeb() {
  //creamos un estado de tipo array para todas categorias
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, settitleModal] = useState("Inicia Sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  //guardamos los datos del usuario por medio del useEffect y solo se ejecutara cuando los datos cambien
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  //obteniendo las categorias almacenadas en la base de datos y la guardamos en un estado
  useEffect(() => {
    (async () => {
      const response = await getCategoryApi();
      setCategory(response || []);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuProduct category={category} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} settitleModal={settitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuProduct(props) {
  const { category } = props;
  // const index = category[11];
  // console.log(index);
  return (
    <Menu stackable>
      <Dropdown text="Categorias" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item className="drop">
            {map(category, (category) => (
              <Link href={`/products/${category.url}`} key={category._id}>
                <Menu.Item as="a" name={category.url}>
                  {category.title}
                </Menu.Item>
              </Link>
            ))}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Link href="/products/promociones">
        <Menu.Item as="a">Promociones</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  const { productsCart } = useCart();

  return (
    <Menu stackable>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="shopping bag" />
              Mis Pedidos
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item className="m-0" onClick={logout}>
            <Icon name="sign out" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
