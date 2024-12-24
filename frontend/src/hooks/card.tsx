import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";
import { useNavigate } from "react-router";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import RefreshHook from "./refresh";

const CardHook = () => {
  const [card, setCard] = useState<Card | null>(null);
  const [openSection, setOpenSection] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAddedCart, setIsAddedCart] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.user);
  const { refreshAccessToken } = RefreshHook();

  const navigate = useNavigate();

  const fetchCard = async (id: string) => {
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

  const addInCart = async () => {
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
      } else if (response.status === 400) {
        const refreshed = await refreshAccessToken();
        refreshed
          ? await addInCart()
          : console.log("Не удалось обноваить токен");
      }
    } catch (error) {
      console.log("Ошибка добавления товара в корзину", error);
    }
  };

  const addInFavourite = async () => {
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
      } else if (response.status === 400) {
        const refreshed = await refreshAccessToken();
        refreshed
          ? await addInFavourite()
          : console.log("Не удалось обноваить токен");
      }
    } catch (error) {
      console.log("Ошибка добавления в избранное", error);
    }
  };

  return {
    setOpenSection,
    setSelectedImage,
    card,
    selectedImage,
    addInCart,
    addInFavourite,
    openSection,
    isVisible,
    isAddedCart,
    fetchCard,
  };
};

export default CardHook;
