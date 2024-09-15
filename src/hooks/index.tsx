import { useContext } from "react";
import { ProductContext, ProductContextType } from "../context/ProductContext";
import { CartContext, CartContextType } from "../context/CartContext";

export function useCart() {
  const context = useContext(CartContext) as CartContextType;
  if (context === undefined)
    throw new Error("cartcontext was used in outside ");
  return context;
}

export function useProduct() {
  const context = useContext(ProductContext) as ProductContextType;
  if (context === undefined) {
    throw new Error("ourproduct context was used in outside of context");
  }
  return context;
}
