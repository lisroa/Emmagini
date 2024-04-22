"use client";

import React, { createContext } from "react";

import axios from "axios";
import { useState, useContext, useEffect, useCallback } from "react";

const TOKEN_KEY = "token";
const USER_ID_KEY = "user_id";

interface AuthContextValues {
  userId: string;
  token: string;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;

  singUpNewUser: (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValues>({} as any);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const singUpNewUser = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => {
      try {
        const response = await axios.post(
          "https://backend.emmagini.com/api2/registrar",
          {
            username: email,
            fullname: username,
            password: password,
            repassword: confirmPassword,
            lang: "es",
            host: "demo25.emmagini.com",
            timezone: -3,
            fcm_token: "",
          },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);

        throw error;
      }
    },
    []
  );

  const signInWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await axios.post(
          "https://backend.emmagini.com/api2/gettoken",
          {
            username: email,
            password: password,
            timezone: -3,
            fcm_token: "",
            id_plataforma: 3,
            lang: "es",
            host: "demo25.emmagini.com",
          },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        );

        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_ID_KEY, response.data.userid);

        setToken(response.data.token);
        setUserId(response.data.userid);

        // TODO: Empezar a guardar el token y userID en la cache

        return response.data;
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);

        throw error;
      }
    },
    []
  );

  // TODO: Agregar un useEffect que se ejecuta una unica vez y que se trae el token y userId de cache y los guarda en el state (si es que existen).

  useEffect(() => {
    const getCacheData = () => {
      const cachedToken = localStorage.getItem(TOKEN_KEY);
      const cachedUserId = localStorage.getItem(USER_ID_KEY);
      if (cachedToken && cachedUserId) {
        setToken(cachedToken);
        setUserId(cachedUserId);
      }
    };

    getCacheData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        signInWithEmailAndPassword,
        singUpNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
