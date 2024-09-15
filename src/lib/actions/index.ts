import { Product } from "../types";

export enum ActionTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  PRODUCT_ERROR = "PRODUCT_ERROR",
  PRODUCT_LOADING = "PRODUCT_LOADING",
}

type ProductAction = {
  type: ActionTypes.FETCH_PRODUCTS;
  payload: Product[];
};

type ProductErrorAction = {
  type: ActionTypes.PRODUCT_ERROR;
  error: string;
};

type ProductLoadingAction = {
  type: ActionTypes.PRODUCT_LOADING;
  isLoading: boolean;
};

export type Actions = ProductAction | ProductErrorAction | ProductLoadingAction;
