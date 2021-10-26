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
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth/Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {
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

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuProduct />
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

function MenuProduct() {
  return (
    <Menu>
      <Dropdown text="Categorias" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item className="drop">
            <Link href="/cuadro">
              <Menu.Item as="a">Cuadro</Menu.Item>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="drop">
            <Link href="/cuadro">
              <Menu.Item as="a">Cuadro</Menu.Item>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="drop">
            <Link href="/cuadro">
              <Menu.Item as="a">Cuadro</Menu.Item>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="drop">
            <Link href="/cuadro">
              <Menu.Item as="a">Cuadro</Menu.Item>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Link href="/promocion">
        <Menu.Item as="a">Promocion</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="shopping bag" />
              Mis Pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Favoritos
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
