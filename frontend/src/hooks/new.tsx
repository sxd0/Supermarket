import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";

const NewHook = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, isSetLoading] = useState(false);

  const fetchNewCards = async () => {
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

  return {
    cards,
    isLoading,
    fetchNewCards,
  };
};

export default NewHook;
