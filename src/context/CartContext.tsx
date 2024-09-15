import React from "react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getCartItems } from "../lib/apis";
import { Cart } from "../lib/types";

interface CartProviderProps {
  children: React.ReactNode;
}

export type CartContextType = {
  cart: Cart[];
  isLoading: false | true;
  addCartItemsHandler: (
    selectId: number,
    name: string,
    img: string,
    price: string,
  ) => void;
  deleteHandler: (id: number) => void;
  error: string | null;
};

export const CartContext = createContext<CartContextType | []>([]);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<false | true>(false);

  useEffect(function () {
    async function cartItems() {
      setIsLoading(true);
      try {
        const res = await getCartItems();
        setCart(res);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      }
    }
    cartItems();
  }, []);

  async function addCartItemsHandler(
    selectId: number,
    name: string,
    img: string,
    price: string,
  ) {
    const payload: Cart = {
      id: selectId,
      name,
      img,
      price,
    };

    try {
      const res = await axios.post("http://localhost:3000/cart", payload);
      if (res.status === 201) {
        setCart([...cart, res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHandler(id: number) {
    const res = await axios.delete(`http://localhost:3000/cart/${id}`);
    if (res.status === 200) {
      const newCartItems = cart.filter((items) => items.id !== id);
      setCart(newCartItems);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addCartItemsHandler,
        deleteHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
