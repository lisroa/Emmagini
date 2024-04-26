import Link from "next/link";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import DivRounded from "@/app/components/extras/DivRounded";
import PrizesCard from "@/app/components/cards/PrizesCard";


// TODO: Pegar a la API, traer todo desde ahi.


function ProximoTorneo () {
    return (
        <>
            <h1 className=" mt-20 text-black text-center font-bold text-2xl">Nombre del torneo</h1>
                <div className="w-[350px] lg:w-[650px] mx-auto">
                <h2 className=" mt-4 font-medium text-sm text-black text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, maiores dolore!</h2>
                </div>
               <Link href="/#">
              <div className="w-[209px] mx-auto sm:w-[209px] md:w-[280px] lg:w-[328px] sm:mb-4">
              <RoundButton
                buttonClassName="bg-blueEmmagini mx-auto h-8 mt-4 rounded-[50px] border-4 border-gray-200 "
                text="Anotarse"
                textClassName="text-white text-base font-bold"
                />
              </div>
               </Link>
               <p className="text-[10px] md:text-xs lg:text-base text-center text-black mt-2"> Fin de la fase: 30/06/2024</p>
               <div className="w-[339px] h-32 lg:h-[180px] mx-auto mt-2">
                    
                <div className="flex flex-wrap gap-4 justify-center items-center w-[337px] h-14 mt-2">
                    <div className="flex flex-col justify-center items-center w-full">
                        <p className="text-blueEmmagini text-base">Participantes</p>
                        <DivRounded 
                            divClassName="w-[328px] h-8"
                            text="3522" />
                    </div>

                </div>

                <div className="flex justify-center">
                    
                <div className="w-[336.91] h-[366] mt-8">
                <h2 className="text-black ml-6 mb-2 text-xs lg:text-base font-semibold">Premios</h2>
                    <PrizesCard 
                        title="Primer premio"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                    <PrizesCard 
                        title="Segundo premio"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />
                    <PrizesCard 
                        title="Tercer premio"
                        description="descripcion del premio ioioioioioioioi ioioioioio ioioioioio ioioioio ioioioio ioioioio iooioioiooio ioioioio ioioio"
                    />

                    
                    <Link href="/#">
                        <p className="text-blueEmmagini font-medium text-base text-center">Terminos y condiciones</p>
                    </Link>
               
                </div>
                
            </div>




               </div>



        </>
    )
}


export default ProximoTorneo; 