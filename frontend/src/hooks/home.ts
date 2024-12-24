import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";

export const [cardSales, setCardSales] = useState<Card[]>([]);
export const [cardPopulars, setCardPopulars] = useState<Card[]>([]);

export const [isLoadingSale, isSetLoadingSale] = useState(false);
export const [isLoadingPopular, isSetLoadingPopular] = useState(false);

export const fetchCardSales = async (limitSale: number) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/card/sale?skip=0&limit=${limitSale}`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setCardSales(response.data);
      isSetLoadingSale(true);
    }
  } catch (error) {
    console.log("Ошибка получения карточек: ", error);
    isSetLoadingSale(false);
  }
};

export const fetchCardPopulars = async (limitPopular: number) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/card/popular?skip=0&limit=${limitPopular}`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setCardPopulars(response.data);
      isSetLoadingPopular(true);
    }
  } catch (error) {
    console.log("Ошибка получения карточек: ", error);
    isSetLoadingPopular(false);
  }
};
