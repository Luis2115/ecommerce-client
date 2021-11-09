//creamos un hook personalizado el cual solo exportara al contexto CartContext
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default () => useContext(CartContext);
