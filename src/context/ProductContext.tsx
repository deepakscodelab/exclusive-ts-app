import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getProductItems } from "../apis";
import { Product, ProductContextType } from "../@types/product";

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductContext = createContext<ProductContextType | []>([]);

function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<false | true>(false);
  const [selectId, setSelectedId] = useState();

  useEffect(
    function () {
      async function productItems() {
        try {
          setIsLoading(true);
          setError("");
          const res = await getProductItems();
          setProducts(res);
          setIsLoading(false);
          setError("");
        } catch (err) {
          if (err instanceof Error) setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      productItems();
    },
    [selectId],
  );

  const addToWishList = (selectId: number, name: string, img: string) => {
    const payload = {
      id: selectId,
      name: name,
      img: img,
    };
    axios
      .post("http://localhost:3000/wishlist", payload)
      .then((res) => {
        setSelectedId(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        isLoading,
        products,
        error,
        addToWishList,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductProvider };
