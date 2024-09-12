export interface Cart {
  id: number;
  name: string;
  img: string;
}

export type CartContextType = {
  cart: Cart[];
  isLoading: false | true;
  addCartItemsHandler: (selectId: number, name: string, img: string) => void;
  deleteHandler: (id: number) => void;
  error: string | null;
};
