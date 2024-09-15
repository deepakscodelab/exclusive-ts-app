import { Actions, ActionTypes } from "../actions";
import { State } from "../types";

export const initialState: State = {
  products: [],
  isLoading: false,
  error: null,
};

export function productReducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case ActionTypes.PRODUCT_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.PRODUCT_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
