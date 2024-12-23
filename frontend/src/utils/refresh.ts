export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.ok) {
    return response;
  } else if (response.status === 400) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    }
  }

  throw new Error("Неизветсная ошибка");
};

export const refreshAccessToken = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8080/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      await response.json();
      console.log("Токен обновлен");
      return true;
    } else {
      console.log("Не удалось обновить токен");
      return false;
    }
  } catch (error) {
    console.log("Ошибка обновления токена:", error);
    return false;
  }
};
