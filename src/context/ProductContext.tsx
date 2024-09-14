import { createContext, useEffect, useReducer } from "react";
import { getProductItems } from "../lib/apis";
import { Product, State } from "../@types/product";

interface ProductProviderProps {
  children: React.ReactNode;
}

const initialState: State = {
  products: [],
  isLoading: false,
  error: null,
};

type ProductAction = {
  type: "FETCH_PRODUCTS";
  payload: Product[];
};

type ProductErrorAction = {
  type: "PRODUCT_ERROR";
  error: string;
};

type ProductLoadingAction = {
  type: "PRODUCT_LOADING";
  isLoading: boolean;
};

type Actions = ProductAction | ProductErrorAction | ProductLoadingAction;

// Define the type for your context data
export type ProductContextType = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

function productReducer(state: State, action: Actions) {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };
    case "PRODUCT_ERROR":
      return { ...state, error: action.error };
    case "PRODUCT_LOADING":
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}

export const ProductContext = createContext<ProductContextType | null>(null);

function ProductProvider({ children }: ProductProviderProps) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(function () {
    async function productItems() {
      try {
        dispatch({ type: "PRODUCT_LOADING", isLoading: true });
        const res = await getProductItems();
        dispatch({ type: "FETCH_PRODUCTS", payload: res });
      } catch (err) {
        if (err instanceof Error)
          dispatch({ type: "PRODUCT_ERROR", error: err.message });
      } finally {
        dispatch({ type: "PRODUCT_LOADING", isLoading: false });
      }
    }
    productItems();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductProvider };
