import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";

export const [page, setPage] = useState<number[] | null>(null);
export const [favourite, setFavourite] = useState<{ [key: number]: Card }>({});

export const fetchCard = async (id: number) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/card/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setFavourite((item) => ({
        ...item,
        [id]: response.data,
      }));
    }
  } catch (error) {
    console.log("Ошибка получения карточки", error);
  }
};

export const deleteCard = async (id: number) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8080/auth/favourites/remove?favourite=${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setPage((prevCart) => prevCart?.filter((item) => item !== id) || null);
    }
  } catch (error) {
    console.log("Ошибка получения карточки", error);
  }
};

export const fetchFavourites = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/auth/favoutires", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setPage(response.data);
      response.data.forEach((item: number) => {
        fetchCard(item);
      });
    }
  } catch (error) {
    console.log("Ошибка получения корзины", error);
  }
};
