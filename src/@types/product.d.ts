export interface Product {
  id: number;
  name: string;
  img: string;
  price: string;
  isNewProduct: true | false;
  review: string;
  rating: string;
}

export type ProductContextType = {
  products: Product[];
  isLoading: true | false;
  error: string | null;
  addToWishList: (selectId: number, name: string, img: string) => void;
};
