import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";
import RefreshHook from "./refresh";

const FavouriteHook = () => {
  const { refreshAccessToken } = RefreshHook();

  const [page, setPage] = useState<number[] | null>(null);
  const [favourite, setFavourite] = useState<{ [key: number]: Card }>({});

  const fetchCard = async (id: number) => {
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
      } else if (response.status === 400) {
        const refreshed = await refreshAccessToken();
        refreshed
          ? await fetchCard(id)
          : console.log("Не удалось обноваить токен");
      }
    } catch (error) {
      console.log("Ошибка получения карточки", error);
    }
  };

  const deleteCard = async (id: number) => {
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
      } else if (response.status === 400) {
        const refreshed = await refreshAccessToken();
        refreshed
          ? await deleteCard(id)
          : console.log("Не удалось обноваить токен");
      }
    } catch (error) {
      console.log("Ошибка получения карточки", error);
    }
  };

  const fetchFavourites = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/auth/favoutires",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPage(response.data);
        response.data.forEach((item: number) => {
          fetchCard(item);
        });
      } else if (response.status === 400) {
        const refreshed = await refreshAccessToken();
        refreshed
          ? await fetchFavourites()
          : console.log("Не удалось обноваить токен");
      }
    } catch (error) {
      console.log("Ошибка получения корзины", error);
    }
  };

  return {
    page,
    favourite,
    deleteCard,
    fetchFavourites,
  };
};

export default FavouriteHook;
