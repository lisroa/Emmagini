/*"use client";

import {createContext,useState,useContext,useEffect,useCallback,} from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import {usePartidasTrucoDataContext} from "@/app/context/truco/PartidasTrucoProvider";


export const SeriesTrucoContext = createContext();

export const SeriesTrucoProvider = ({ children }) => {
  const [data, setData] = useState();
  const [dataSeries, setDataSeries] = useState();
  const [infoTorneosTruco, setInfoTorneosTruco] = useState();
  const [infoSeriesTruco, setInfoSeriesTruco] = useState();
  const [idTorneo, setIdTorneo] = useState("");
  const [idSerie, setIdSerie] = useState("");


  const { userId, token } = useAuthContext();
  //const {crearPartida} = usePartidasTrucoDataContext();



// Traer Torneos

  const getTorneosData = useCallback(async () => {
    try {
      const tournamentId = localStorage.getItem("tournamentId");
      const response = await axios.post(
        "https://backend.emmagini.com/api2/get_torneotruco",
        {
          token,
          userid: userId,
          host: "demo23.emmagini.com",
          id: tournamentId,
          lang: "es"
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );
  
      setData(response.data);
      setInfoTorneosTruco(response.data.content);
  
      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      throw error;
    }
  }, [idTorneo]);

  useEffect(() => {
    getTorneosData();
  }, [idTorneo]);

  /*useEffect(() => {
    console.log("este es el id del torneo", idTorneo)
  }, [idTorneo]);  */

// Traer las series del torneo seleccionado

/*const getSeriesData = useCallback(async () => {
    try {
      const serieId = localStorage.getItem("serieId");
      const response = await axios.post(
        "https://backend.emmagini.com/api2/get_trucoserie",
        {
          token,
          userid: userId,
          id: serieId,
          host: "demo23.emmagini.com",
          lang: "es"
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );
  
      setDataSeries(response.data);
      setInfoSeriesTruco(response.data.content);
  
      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      throw error;
    }
  }, [idSerie]);

      useEffect(() => {
        getSeriesData();
      }, [idSerie]);


      /*useEffect(() => {
        console.log(infoSeriesTruco)
      }, [dataSeries, infoSeriesTruco]); */

/*return (
    <SeriesTrucoContext.Provider
      value={{
        data,
        setData,
        infoTorneosTruco,
        setInfoTorneosTruco,
        idTorneo,
        setIdTorneo,
        idSerie, 
        setIdSerie,
        infoSeriesTruco, 
        setInfoSeriesTruco,
        getSeriesData
        
      }}
    >
      {children}
    </SeriesTrucoContext.Provider>
  );
};

export const useSeriesTrucoDataContext = () => useContext(SeriesTrucoContext); */
