import { RoundButton } from "@/app/components/buttons/RoundButton";


function Perfil (){
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                    <div className="w-[117px] h-5  mt-20">
                        <h1 className="text-black text-center font-semibold text-base">Usuario</h1>
                    </div>
                    <div className="w-[230px] h-6  mt-4">
                        <h1 className="font-bold text-2xl text-black text-center">Mis datos</h1>
                    </div>
                    <div className="mt-8">
                        <form className="grid grid-cols-1 gap-4 lg:gap-20 lg:grid-cols-2">
                            <div className="w-[344px] h-14 rounded-lg bg-white p-2">
                                <p className="font-normal text-xs text-slate-300 ml-2">Usuario</p>
                                <input type="text" className="text-black w-[330px] bg-white"></input>
                            </div>
                            <div className="w-[344px] h-14 rounded-lg bg-white p-2">
                                <p className="font-normal text-xs text-slate-300 ml-2">Email</p>
                                <input type="text" className="text-black w-[330px] bg-white"></input>
                            </div>
                            <div className="w-[344px] h-14 rounded-lg bg-white p-2">
                                <p className="font-normal text-xs text-slate-300 ml-2">Pais</p>
                                <input type="text" className="text-black w-[330px] bg-white"></input>
                            </div>
                            <div className="w-[344px] h-14 rounded-lg bg-white p-2">
                                <p className="font-normal text-xs text-slate-300 ml-2">Ciudad</p>
                                <input type="text" className="text-black w-[330px] bg-white"></input>
                            </div>
                            <div className="w-[344px] h-14 rounded-lg bg-white p-2">
                                <p className="font-normal text-xs text-slate-300 ml-2">Edad</p>
                                <input type="text" className="text-black w-[330px] bg-white"></input>
                            </div>
                        </form>
                    </div>
                    <div className="w-[197px] h-auto mt-8">
                        <h1 className="text-black text-2xl font-bold text-center">Idioma</h1>
                        <div className="flex flex-wrap gap-2 w-[197px] rounded-lg h-[41px] top-0 justify-center aling-center items-center ">
                            <div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
                            <div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
                            <div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
                            <div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
                        </div>
                    </div>
                    <div className="w-[295px] mt-14">
                        <RoundButton buttonClassName="h-[45.37px] bg-blueEmmagini" textClassName="text-white font-bold text-base" text="Guardar"/>
                        <RoundButton buttonClassName="h-[45.37px] bg-sky-400 mt-2" textClassName="text-white font-bold text-base" text="Cancelar"/>
                    </div>
                </div>
        </>
    )
}


export default Perfil;