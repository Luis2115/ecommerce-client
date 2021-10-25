import { createContext } from "react";

//creamos un contexto el cual se usara de forma global en todo el proyecto
const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  setReloadUser: () => null,
});

export default AuthContext;
