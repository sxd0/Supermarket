import { useState } from "react";
import { Card } from "../Types/cardType";
import { Catalog } from "../Types/catalogType";
import axios from "axios";

export const [cards, setCards] = useState<Card[]>([]);
export const [catalog, setCatalog] = useState<Catalog[]>([]);
export const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
export const [isLoadingCards, setIsLoadingCards] = useState(false);

export const fetchCardCatalog = async (catalogId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/card/only/${catalogId}`,
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setCards(response.data);
      setIsLoadingCards(true);
    }
  } catch (error) {
    console.log("Ошибка получения карточек: ", error);
    setIsLoadingCards(false);
  }
};

export const fetchCatalog = async () => {
  try {
    const response = await axios.get("http://localhost:8080/category", {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status === 200) {
      setCatalog(response.data);
      setIsLoadingCatalog(true);
    }
  } catch (error) {
    console.log("Ошибка получения каталога: ", error);
    setIsLoadingCatalog(false);
  }
};
