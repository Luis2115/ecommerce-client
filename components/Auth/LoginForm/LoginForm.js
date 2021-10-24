import React from "react";

export default function LoginForm(props) {
  const { showRegisterForm } = props;
  return (
    <div>
      <h1>Estamos en el formulario de login</h1>
      <button onClick={showRegisterForm}>ir al registro</button>
    </div>
  );
}
