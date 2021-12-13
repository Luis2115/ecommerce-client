import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getLastProductApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = `_sort=uploadDate:desc`;
    const url = `${BASE_PATH}/products?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsCategoryApi(category, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=uploadDate:asc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/products?category.url=${category}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalCategoryApi(category) {
  try {
    const url = `${BASE_PATH}/products/count?category.url=${category}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsPromotionApi(promotion, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=uploadDate:asc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/products?promotion=${promotion}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalProductsPromotionApi(promotion) {
  try {
    const url = `${BASE_PATH}/products/count?promotion=${promotion}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductByUrl(path) {
  try {
    const url = `${BASE_PATH}/products?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchProductApi(title) {
  try {
    const url = `${BASE_PATH}/products?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductById(id) {
  try {
    const url = `${BASE_PATH}/products/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.stock;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateProductStock(idProduct, stock, logout) {
  try {
    const response = await getProductById(idProduct);
    //console.log("stock actual: " + response);

    const sto = response - stock;
    //console.log("stock resultante: " + sto);

    const url = `${BASE_PATH}/products/${idProduct}`;
    const params = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: sto }),
    };

    const result = authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
