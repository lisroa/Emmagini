"use client";

import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";

export const JuegoTrucoContext = createContext();

export const JuegoTrucoProvider = ({ children }) => {
  const [dataJuego, setDataJuego] = useState();
  const [infoJuegoTruco, setInfoJuegoTruco] = useState("");
  const [idPartidaElegida, setIdPartidaElegida] = useState("");   
  const { userId, token } = useAuthContext();

  const INTERVAL_TIME = 5000;


  const getJuegoData = useCallback(async () => {


    try {

        const tournamentId = localStorage.getItem("tournamentId");
        const serieId = localStorage.getItem("serieId");
        const idPartido = localStorage.getItem("partidoId"); 
       
     
      const response = await axios.post(
        "https://backend.emmagini.com/api2/get_trucopartido",
        {
          token,
          userid: userId,
          lastid: -1,
          id: idPartido,
          serie: serieId,
          torneo: tournamentId,
          host: "demo23.emmagini.com",
          accion: "",
          param: "",
          lang: "es",

        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );
  
      setDataJuego(response.data);
      setInfoJuegoTruco(response.data.content);
  
      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      throw error;
    }
  }, [idPartidaElegida]);

      useEffect(() => {
        getJuegoData();
      }, [idPartidaElegida]);


   useEffect(() => {
        
        getJuegoData();
    
        const interval = setInterval(() => {
          getJuegoData();
        }, INTERVAL_TIME);
        return () => clearInterval(interval);
      }, [getJuegoData]); 


      

          const catchActions = useCallback(async (action) => {

            try {
        
                const tournamentId = localStorage.getItem("tournamentId");
                const serieId = localStorage.getItem("serieId");
                const idPartido = localStorage.getItem("partidoId"); 
               
             
              const response = await axios.post(
                "https://backend.emmagini.com/api2/get_trucopartido",
                {
                  token,
                  userid: userId,
                  lastid: "",
                  id: idPartido,
                  serie: serieId,
                  torneo: tournamentId,
                  host: "demo23.emmagini.com",
                  accion: action,
                  param: "",
                  lang: "es",
        
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  },
                }
              );
          
              setDataJuego(response.data);
              setInfoJuegoTruco(response.data.content);
          
              return response.data;
            } catch (error) {
              console.error("Error al hacer la solicitud:", error);
              throw error;
            }
          }, []);
        
              useEffect(() => {
                catchActions()
              }, [catchActions]);




    
          const catchParam = useCallback(async (accion, param) => {

                try {
            
                    const tournamentId = localStorage.getItem("tournamentId");
                    const serieId = localStorage.getItem("serieId");
                    const idPartido = localStorage.getItem("partidoId"); 
                   
                 
                  const response = await axios.post(
                    "https://backend.emmagini.com/api2/get_trucopartido",
                    {
                      token,
                      userid: userId,
                      lastid: "",
                      id: idPartido,
                      serie: serieId,
                      torneo: tournamentId,
                      host: "demo23.emmagini.com",
                      accion: accion,
                      param: param,
                      lang: "es",
            
                    },
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                      },
                    }
                  );
              
                  setDataJuego(response.data);
                  setInfoJuegoTruco(response.data.content);
              
                  return response.data;
                } catch (error) {
                  console.error("Error al hacer la solicitud:", error);
                  throw error;
                }
              }, []);
            
                  useEffect(() => {
                    catchParam()
                  }, [catchParam]);
    
    return (

    <JuegoTrucoContext.Provider value={{ 
        infoJuegoTruco, 
        setInfoJuegoTruco, 
        idPartidaElegida, 
        setIdPartidaElegida,
        getJuegoData,
        catchActions,
        catchParam
    
    }}>
      {children}
    </JuegoTrucoContext.Provider>
  );
};

export const useJuegoTrucoDataContext = () =>
  useContext(JuegoTrucoContext);
