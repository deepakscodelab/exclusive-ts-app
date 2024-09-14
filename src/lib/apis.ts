import axios from "axios";
import { Product } from "../@types/product";
import { Cart } from "../@types/cart";

export async function getWishlist() {
  const res = await fetch("http://localhost:3000/wishlist");
  if (!res.ok) throw Error("Faild geeting Wishlist");
  const data = await res.json();

  return data;
}

export async function getProductItems(): Promise<Product[]> {
  const res = await axios.get("http://localhost:3000/productlists");
  return res.data;
}

export async function getCartItems(): Promise<Cart[]> {
  const res = await axios.get("http://localhost:3000/cart");
  return res.data;
}

export async function fetchUsers(): Promise<Cart[]> {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
}
