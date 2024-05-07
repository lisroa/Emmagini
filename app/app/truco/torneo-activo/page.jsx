import Link from "next/link";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import DivRounded from "@/app/components/extras/DivRounded";
import GamesCounter from "@/app/components/extras/GamesCounter"
import PrizesCard from "@/app/components/cards/PrizesCard";


// TODO: Pegar a la API, traer todo desde ahi.


function PartidaActiva () {
    return (
        <>
        <h1 className="mt-20 text-black text-center font-bold text-2xl">Nombre del torneo</h1>
        <div className="w-[350px] lg:w-[650px] mx-auto">
            <h2 className="mt-4 font-medium text-sm text-black text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, maiores dolore!</h2>
                    <Link href="/#">
                        <p className="text-blueEmmagini font-medium text-base text-center">Terminos y condiciones</p>
                    </Link>
        </div>
    
        <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex flex-col">
                <Link href="/#">
                    <div className="w-[209px] mx-auto sm:w-[209px] md:w-[280px] lg:w-[380px] sm:mb-4">
                        <RoundButton
                            buttonClassName="bg-blueEmmagini mx-auto h-8 mt-4 rounded-[50px] border-4 border-gray-200"
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
    
            <div className="flex justify-center">
                <div className="w-[336.91] h-[366] mt-4">
                    <h2 className="text-black ml-6 mb-2 text-xs lg:text-base font-semibold">Premios</h2>
                    <PrizesCard 
                        cardClassName="w-[336px] h-[99px]"
                        title="Primer premio"
                        imageClassName="rounded-lg"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                    <PrizesCard 
                        cardClassName="w-[336px] h-[99px]"
                        title="Segundo premio"
                        imageClassName="rounded-lg"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                    <PrizesCard 
                        cardClassName="w-[336px] h-[99px]"
                        title="Tercer premio"
                        imageClassName="rounded-lg"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                </div>
            </div>
        </div>
    </>
    
    )
}


export default PartidaActiva; 


