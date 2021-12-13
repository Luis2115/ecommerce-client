import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getOrdersApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;
    const result = authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOrdersAllApi(logout, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/orders?${limitItems}&${sortItems}&${startItems}`;
    const result = authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOrderIdApi(id) {
  try {
    const url = `${BASE_PATH}/orders?id=${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalOrderApi() {
  try {
    const url = `${BASE_PATH}/orders/count`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOrder(idOrder, estado, logout) {
  try {
    const url = `${BASE_PATH}/orders/${idOrder}`;
    const params = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    };

    const result = authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
