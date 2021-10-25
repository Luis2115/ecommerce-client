//creamos un hook personalizado el cual solo exportara al contexto AuthContext
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default () => useContext(AuthContext);
