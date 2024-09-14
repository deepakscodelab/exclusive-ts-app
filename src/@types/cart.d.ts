export interface Cart {
  id: number;
  name: string;
  img: string;
  price: string;
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
