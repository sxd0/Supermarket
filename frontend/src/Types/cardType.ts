export interface Card {
  id: number;
  title: string;
  price: number;
  category_id: number;
  quantity: number | null;
  description: string;
  size: Array<string>;
  gender: string;
  sale: number | null;
  new: boolean;
  popular: boolean;
  image: string;
}

export enum CardGender {
  FEMALE = "female",
  MALE = "male",
}
