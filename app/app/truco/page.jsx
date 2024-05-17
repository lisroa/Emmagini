"use client"
import CardGames from "../../components/cards/CardGames"
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import CleanLocalStorageOnUnmount from "@/app/app/truco/CleanLocalStorageOnUnmount";

  // TODO: Hay que agregar logica que ordene los torneos por activos, proximos o anteriores segun la fecha o algun parametro que venga por API.
    // TODO: Adaptar a pantallas mas grandes segun el disenio que armen proximamente.

export default function Page() { 

    const {infoTorneosTruco, setIdSerie} = useSeriesTrucoDataContext();
    
    
        const saveSerieIdToCache = (serieId) => {
          localStorage.setItem("serieId", serieId);
        };

  
        const handleSerieClick = (serieId) => {
          setIdSerie(serieId); 
          saveSerieIdToCache(serieId); 
        };


  return (
    <>
    
    <h1 className="text-black text-center mt-20 text-2xl font-bold">Torneos de truco</h1>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoTorneosTruco && infoTorneosTruco.series && infoTorneosTruco.series.map((serie) => (
                <div key={serie.id} className="flex justify-center">
                  <CardGames
                    link="/app/truco/partidas-disponibles"
                    image= {serie.imagen}
                    alt="serie.nombre"
                    title= {serie.nombre}
                    description= {serie.inicio_txt}
                    buttonText="ingresar"
                    textSpan={serie.fin_txt}
                    buttonClassName="bg-blueEmmagini w-[160px] h-[36.37px]"
                    onClick={() => handleSerieClick(serie.id)}
                  />
                </div>
              ))}
          </div>
      </div>
    
    
    </>
  );
};

