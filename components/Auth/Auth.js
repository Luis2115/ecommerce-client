import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {
  const { onCloseModal, settitleModal } = props;

  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
    settitleModal("Inicia Sesión");
  };
  const showRegisterForm = () => {
    setShowLogin(false);
    settitleModal("Registrar Usuario");
  };

  return showLogin ? (
    <LoginForm showRegisterForm={showRegisterForm} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
