import React from "react";
import { Form, Button } from "semantic-ui-react";

export default function ChangeNameForm(props) {
  const { user } = props;

  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre y apellidos</h4>
      <Form>
        <Form.Group widths="equal">
          <Form.Input name="name" placeholder="Nuevo Nombre" />
          <Form.Input name="lastname" placeholder="Nuevos Apellidos" />
        </Form.Group>
        <Button className="submit">Actualizar usuario</Button>
      </Form>
    </div>
  );
}
