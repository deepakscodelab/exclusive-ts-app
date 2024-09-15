import { createContext, useEffect, useReducer } from "react";
import { getProductItems } from "../lib/apis";
import { initialState, productReducer } from "../lib/reducer";
import { State } from "../lib/types";
import { Actions, ActionTypes } from "../lib/actions";

interface ProductProviderProps {
  children: React.ReactNode;
}
export type ProductContextType = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

export const ProductContext = createContext<ProductContextType | null>(null);

// https://medium.com/@ctrlaltmonique/how-to-use-usecontext-and-usereducer-with-typescript-in-react-735f6c5f27ba

function ProductProvider({ children }: ProductProviderProps) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(function () {
    async function productItems() {
      try {
        dispatch({ type: ActionTypes.PRODUCT_LOADING, isLoading: true });
        const res = await getProductItems();
        dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: res });
      } catch (err) {
        if (err instanceof Error)
          dispatch({ type: ActionTypes.PRODUCT_ERROR, error: err.message });
      } finally {
        dispatch({ type: ActionTypes.PRODUCT_LOADING, isLoading: false });
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
