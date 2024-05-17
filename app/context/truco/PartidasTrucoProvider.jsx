"use client";

import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useSeriesTrucoDataContext } from "./SeriesTrucoProvider";



export const PartidasTrucoContext = createContext();

export const PartidasTrucoProvider = ({ children }) => {
  const [data, setData] = useState();
  const { userId, token } = useAuthContext();
  const {getSeriesData} = useSeriesTrucoDataContext();




  // Función para crear una partida
  const crearPartida = async () => {
    try {
      const tournamentId = localStorage.getItem("tournamentId");
      const serieId = localStorage.getItem("serieId");

      const response = await axios.post(
        "https://backend.emmagini.com/api2/nuevo_partidotruco",
        {
          token,
          userid: userId,
          host: "demo23.emmagini.com",
          id: serieId,
          lang: "es",
          id_serie: serieId,
          id_torneo: tournamentId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );

      setData(response.data);

      await getSeriesData();

      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      throw error;
    }
  };


// Función para eliminar una partida
const eliminarPartida = async (id) => {
  try {
    const tournamentId = localStorage.getItem("tournamentId");
    const serieId = localStorage.getItem("serieId");
    

    const response = await axios.post(
      "https://backend.emmagini.com/api2/eliminar_partidotruco",
      {
        token,
        userid: userId,
        host: "demo23.emmagini.com",
        id: serieId,
        lang: "es",
        id_partido: id,
        id_serie: serieId,
        id_torneo: tournamentId,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }
    );

    setData(response.data);

    await getSeriesData();

    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};


// Función para eliminar una partida
const unirmeAPartida = async (id) => {
  try {
    const tournamentId = localStorage.getItem("tournamentId");
    const serieId = localStorage.getItem("serieId");
    

    const response = await axios.post(
      "https://backend.emmagini.com/api2/join_partidotruco",
      {
        token,
        userid: userId,
        host: "demo23.emmagini.com",
        id: serieId,
        lang: "es",
        id_partido: id,
        id_serie: serieId,
        id_torneo: tournamentId,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }
    );

    setData(response.data);

    await getSeriesData();

    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
};





  return (
    <PartidasTrucoContext.Provider value={{ crearPartida, eliminarPartida, unirmeAPartida }}>
      {children}
    </PartidasTrucoContext.Provider>
  );
};

export const usePartidasTrucoDataContext = () =>
  useContext(PartidasTrucoContext);
