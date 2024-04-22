"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";

export const GameDataContext = createContext();

export const GameDataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [infoGames, setInfoGames] = useState();

  const { userId, token } = useAuthContext();

  const getAppData = useCallback(async () => {
    console.log(token);
    console.log(userId);

    try {
      // TODO: Llamar a AuthContext para traerte el token y userId, usarlos en esta pegada en vez de tener los valores hardcodeados.

      const response = await axios.post(
        "https://backend.emmagini.com/api2/validate",
        {
          callback: "https://demo25.emmagini.com/home.php#v=inicio",
          token,
          userid: userId,
          host: "demo25.emmagini.com",
          lang: "es",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );

      setData(response.data);
      setInfoGames(response.data.contenidos);

      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);

      throw error;
    }
  }, [token, userId]);

  useEffect(() => {
    getAppData();
  }, []);

  return (
    <GameDataContext.Provider
      value={{
        data,
        setData,
        infoGames,
        setInfoGames,
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};

export const useDataContext = () => useContext(GameDataContext);
