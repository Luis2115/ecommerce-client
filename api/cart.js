import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";

export function getProductsCart() {
  const cart = localStorage.getItem(CART);

  //valida si la variable cart se encuentra en el localstorage
  if (!cart) {
    //sino lo encuentra retorna null
    return null;
  } else {
    //si lo encuentra retorna el array de los productos separados por coma
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();

  if (!cart) {
    //si esta vacio el array cart lo agrega por primera vez
    localStorage.setItem(CART, product);
    toast.success("Producto Añadido al carrito");
  } else {
    //evalua si el producto ya se encuentra en el carrito mediante la funcion includes y sino lo agrega al carrito
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya se encuentra en el carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido correctamente");
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart();

  //Se extrae el producto a remover del carrito
  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
}
