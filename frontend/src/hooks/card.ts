import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";
import { useNavigate } from "react-router";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export const [card, setCard] = useState<Card | null>(null);
export const [openSection, setOpenSection] = useState<string[]>([]);
export const [selectedImage, setSelectedImage] = useState<string>("");
export const [isVisible, setIsVisible] = useState<boolean>(false);
export const [isAddedCart, setIsAddedCart] = useState<boolean>(false);

const { user } = useSelector((state: RootState) => state.user);

export const navigate = useNavigate();

export const fetchCard = async (id: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/card/${id}`, {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status === 200) {
      setCard(response.data);
      setSelectedImage(response.data.image);
    }
  } catch (error) {
    console.error("Ошибка получения карточки: ", error);
  }
};

export const addInCart = async () => {
  if (!user) return navigate("/profile");

  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/cart",
      {
        card_id: card?.id,
        quantity: 1,
      },
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(`Товар ${card?.title} добавлен в корзину`);
      setIsVisible(true);
      setIsAddedCart(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  } catch (error) {
    console.log("Ошибка добавления товара в корзину", error);
  }
};

export const addInFavourite = async () => {
  if (!user) return navigate("/profile");

  try {
    const response = await axios.post(
      `http://127.0.0.1:8080/auth/favourites/add?favourite=${card?.id}`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setIsVisible(true);
      setIsAddedCart(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  } catch (error) {
    console.log("Ошибка добавления в избранное", error);
  }
};
