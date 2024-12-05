export interface Card {
  id: number;
  title: string;
  price: number;
  category_id: number;
  quantity: number | null;
  description: string;
  sale: number | null;
  new: boolean;
  flag: boolean;
  image: number;
}