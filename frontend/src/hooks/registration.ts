import { useNavigate } from "react-router";
import axios from "axios";

const navigate = useNavigate();

export const postRegistration = async (
  e: React.FormEvent,
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/auth/register",
      { name, surname, email, password },
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      navigate("/profile");
      console.log("Пользователь зарегистрирован");
    }
  } catch (error) {
    console.log("Ошибка входа пользователя: ", error);
  }
};
