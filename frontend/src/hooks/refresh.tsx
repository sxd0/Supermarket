import axios from "axios";

const RefreshHook = () => {
  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/auth/refresh",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Токен обновлен");
        return true;
      } else return false;
    } catch (error) {
      console.log("Ошибка обновления токена:", error);
      return false;
    }
  };

  return {
    refreshAccessToken,
  };
};

export default RefreshHook;
