"use client"

import { useEffect } from "react";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import {usePartidasTrucoDataContext} from "@/app/context/truco/PartidasTrucoProvider";
import {useJuegoTrucoDataContext} from "@/app/context/truco/JuegoTrucoProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import CardGames from "@/app/components/cards/CardGames";
import CardNewGame from "@/app/components/cards/CardNewGame";
import tester from "@/public/assets/cards/imageCard.png" 
import { useCallback } from "react";




function Page () {

    const {infoSeriesTruco, getSeriesData} = useSeriesTrucoDataContext();
    const {setIdPartidaElegida, getJuegoData} = useJuegoTrucoDataContext();
    const {crearPartida, eliminarPartida, unirmeAPartida} = usePartidasTrucoDataContext();


    const handleClickCrearPartida = useCallback(
        async () => {
            try {
              await crearPartida() 
              console.log("Partida creada exitosamente");
            } catch (error) {
              console.error("Error al crear la partida:", error);
            }
          }, [crearPartida],

          );

          useEffect(() => {
            getSeriesData(); 
          }, [getSeriesData]);

          const handleClickEliminarPartida = useCallback(
            async (id) => {
                try {
                  await eliminarPartida(id) 
                  console.log("Partida eliminada exitosamente");
                } catch (error) {
                  console.error("Error al crear la partida:", error);
                }
              }, [eliminarPartida],
    
              );
    
              useEffect(() => {
                getSeriesData(); 
              }, [getSeriesData]);

              const savePartidaIdToCache = (partidoId) => {
                localStorage.setItem("partidoId", partidoId);
            };


            const handlePartidaClick = (partidoId) => {
                setIdPartidaElegida(partidoId); 
                savePartidaIdToCache(partidoId); 
            };



              const handleClickUnirmeAPartida = useCallback(
                async (id) => {
                    try {
                      await unirmeAPartida(id) 
                      console.log("Te uniste exitosamente");
                    } catch (error) {
                      console.error("Error al unirte a la partida:", error);
                    }
                  }, [unirmeAPartida],
        
                  );
        
                  useEffect(() => {
                    getJuegoData(); 
                  }, [getJuegoData]);
    


            


    return (
       <>
       <div className="flex justify-center">
       <div className="w-[390px] h-[20px] mx-auto">
            <h1 className="text-black mt-20 text-center">Jugar partido</h1>
            <p className="text-black font-medium text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta magni fuga sunt magnam nihil nam</p>
            <div className="w-[209px] h-[36pxpx] mx-auto">
            <RoundButton
                buttonClassName="bg-blueEmmagini h-[36px] mt-2" 
                text="Crear partida"
                textClassName="text-white"
                onClick={handleClickCrearPartida}
            />
            </div>
       </div>
       </div>
         <div className="w-[1300px] h-auto lg:ml-24 lg:mt-80">
            <h2 className="text-black text-xs font-semibold">Mis partidas creadas</h2>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {infoSeriesTruco && infoSeriesTruco.esperando && infoSeriesTruco.esperando.map((partido) => (
                                <div key={partido.id} className="flex justify-center">
                                    <CardNewGame
                                        image={tester}
                                        alt="Partida creada"
                                        title= {partido.nombre_1}
                                        description= {partido.nombre_2}
                                        buttonText="Eliminar"
                                        buttonClassName="bg-blueEmmagini w-[160px] h-[36px] bg-red"
                                        onClick={() => {handleClickEliminarPartida(partido.id)
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
        </div>
        <div className="w-[1300px] h-auto lg:ml-24 lg:mt-20">
            <h2 className="text-black text-xs font-semibold">Partidos disponibles</h2>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {infoSeriesTruco && infoSeriesTruco.abiertos && infoSeriesTruco.abiertos.map((partido) => (
                            <div key={partido.id} className="flex justify-center">
                                <CardGames
                                    image={tester}
                                    link="/app/truco/partido"
                                    title= {`Oponente: ${partido.nombre_1}`}
                                    buttonText="Entrar"
                                    buttonClassName="bg-blueEmmagini w-[160px] h-[36px]"
                                    onClick={() => handlePartidaClick(partido.id)}
                                    
                                />
                            </div>
                        ))}
                    </div>
            </div>
        </div>
       </>
    )
}


export default Page;