import React, { useState } from "react";
import {
  Container,
  Menu,
  Grid,
  Icon,
  Label,
  MenuItem,
  Dropdown,
} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth/Auth";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, settitleModal] = useState("Inicia Sesión");

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
            <MenuOptions onShowModal={onShowModal} />
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
      <Link href="/cuadro">
        <Menu.Item as="a">Cuadro</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal } = props;

  return (
    <Menu>
      <MenuItem onClick={onShowModal}>
        <Icon name="user outline" />
        Mi cuenta
      </MenuItem>
    </Menu>
  );
}
