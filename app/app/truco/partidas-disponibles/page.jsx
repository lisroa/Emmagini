"use client"
import Link from "next/link";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import DivRounded from "@/app/components/extras/DivRounded";
import GamesCounter from "@/app/components/extras/GamesCounter"
import PrizesCard from "@/app/components/cards/PrizesCard";
import CardGames from "@/app/components/cards/CardGames";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import {useJuegoTrucoDataContext} from "@/app/context/truco/JuegoTrucoProvider";
import tester from "@/public/assets/cards/imageCard.png"





// TODO: Pegar a la API, traer todo desde ahi: textos, info, imagenes
// Agregar logica que pinte el boton de los partidos terminados de rojo o verde segun si ganaste o no

function Page () {
    

    const {infoSeriesTruco} = useSeriesTrucoDataContext();
    const {setIdPartidaElegida} = useJuegoTrucoDataContext();


    const savePartidaIdToCache = (partidoId) => {
        localStorage.setItem("partidoId", partidoId);
      };


      const handlePartidaClick = (partidoId) => {
        setIdPartidaElegida(partidoId); 
        savePartidaIdToCache(partidoId); 
      };



    return (
        <>
        <div>
            <h1 className="mt-20 text-black text-center font-bold text-2xl">Nombre del torneo</h1>
                <div className="w-[350px] lg:w-[650px] mx-auto">
                    <h2 className="sm:mt-2 md:mt-2 lg:mt-4 font-medium text-xs lg:text-sm text-black text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, maiores dolore!</h2>
                            <Link href="/#">
                                <p className="text-blueEmmagini font-medium text-center text-xs lg:text-sm mt-2">Terminos y condiciones</p>
                            </Link>
                </div>
        </div>
    
        <div className="flex flex-wrap justify-center gap-8 mt-2">
            <div className="flex flex-col">
                <Link href="/app/truco/jugar-partida">
                    <div className="w-[209px] mx-auto sm:w-[209px] md:w-[280px] lg:w-[380px] sm:mb-4 lg:mt-6">
                        <RoundButton
                            buttonClassName="bg-blueEmmagini mx-auto h-8 rounded-[50px] border-4 border-gray-200"
                            text="Jugar partido"
                            textClassName="text-white text-base font-bold"
                        />
                    </div>
                </Link>
                <p className="text-[10px] md:text-xs lg:text-base text-center text-black mt-2">Fin de la fase: 27/04/2024</p>
                <div className="w-[339px] h-32 lg:h-[180px] mx-auto mt-2">
                    <p className="text-center text-blueEmmagini text-base font-medium md:text-lg lg:text-2xl">Tu ranking</p>
                    <p className="text-center text-blueEmmagini font-bold text-2xl md:text-3xl lg:text-3xl">83,3%</p>
                    <p className="text-[14px] md:text-xs lg:text-base text-center text-black">Ultimos 10 partidos</p>
                    <GamesCounter />
                    <div className="w-[337px] h-8 lg:w-[360px] lg:h-10 mt-4">
                        <p className="text-[12px] lg:text-[15px] md:text-xs font-normal text-black text-center">Completá 10 partidos para validar tu participación. <br/> El 10% con mejor ranking pasa a la siguiente fase.</p>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center items-center w-[337px] h-14 mt-2">
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-blueEmmagini text-base">Participantes</p>
                            <DivRounded
                                divClassName="w-[160.4px] h-7"
                                text="3522"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-blueEmmagini text-base">Tu posición</p>
                            <DivRounded
                                divClassName="w-[160.4px] h-7"
                                text="176"
                            />
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="flex justify-center mt-12 lg:mt-2">
                <div className="w-[336.91] h-[366] mt-4">
                    <h2 className="text-black ml-6 mb-2 text-xs lg:text-base font-semibold">Premios</h2>
                    <div className="w-[336px] h-[99px] mt-4">
                    <PrizesCard 
                        title="Primer premio"
                        imageClassName="rounded-lg"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                    </div>
                    <div className="w-[336px] h-[99px] mt-4">
                    <PrizesCard 
                        cardClassName="w-[336px] h-[99px] mt-4"
                        title="Segundo premio"
                        imageClassName="rounded-lg"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                    </div>
                    <div className="w-[336px] h-[99px] mt-4">
                    <PrizesCard 
                        cardClassName="w-[336px] h-[99px] mt-4"
                        title="Tercer premio"
                        imageClassName="rounded-lg"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[1300px] h-auto lg:ml-24 lg:mt-14">
        <h2 className="text-black text-xs font-semibold">Activos</h2>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoSeriesTruco && infoSeriesTruco.actuales && infoSeriesTruco.actuales.map((partido) => (
                <div key={partido.id} className="flex justify-center">
                  <CardGames
                    image={tester}
                    link="/app/truco/partido"
                    title= {`Oponente: ${partido.nombre_1}`}
                    description= {`Puntaje:`}
                    buttonText="Entrar"
                    buttonClassName="bg-blueEmmagini w-[160px] h-[36px]"
                    onClick={() => handlePartidaClick(partido.id)}
                    
                  />
                </div>
              ))}
          </div>
      </div>
        </div>
        <div className="w-[1300px] h-auto lg:ml-24 lg:mt-14">
        <h2 className="text-black text-xs font-semibold">Terminados</h2>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoSeriesTruco && infoSeriesTruco.terminados && infoSeriesTruco.terminados.map((partido) => (
                <div key={partido.id} className="flex justify-center">
                  <CardGames
                    image={tester}
                    link="/#"
                    title= {`Oponente: ${partido.nombre_2}`}
                    description= {`Puntaje:`}
                    buttonText= {partido.ganaste == false ? "Perdiste" : "Ganaste"}
                    buttonClassName={partido.ganaste == false ? "bg-red w-[160px] h-[36px]" : "bg-green-600 w-[160px] h-[36px]"}
                    
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


