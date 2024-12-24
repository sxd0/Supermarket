import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";

export const [cards, setCards] = useState<Card[]>([]);
export const [isLoading, isSetLoading] = useState(false);

export const fetchNewCards = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/card/new/", {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status === 200) {
      setCards(response.data);
      isSetLoading(true);
    }
  } catch (error) {
    console.log("Ошибка получения карточек: ", error);
    isSetLoading(false);
  }
};
