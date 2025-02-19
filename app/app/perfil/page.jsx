"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import { FloatingLabel } from "flowbite-react";
import RoundButton from "@/app/components/buttons/RoundButton";

function Perfil() {
	const { infoGames, empresa } = useDataContext();
	const { token, userId } = useAuthContext();

	useEffect(() => {
		const backgroundImage = empresa?.fondo
			? `https://backend.emmagini.com/uploads/${empresa.fondo}`
			: null;

		if (backgroundImage) {
			document.body.style.backgroundImage = `url(${backgroundImage})`;
			document.body.style.backgroundSize = "cover";
			document.body.style.backgroundPosition = "center";
			document.body.style.backgroundRepeat = "no-repeat";
		} else {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundColor = "white";
		}

		return () => {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundColor = "white";
		};
	}, [empresa]);
	return (
		<>
			<div className="flex flex-col justify-center items-center">
				<div className="w-[117px] h-5  mt-20">
					<h1 className="text-white text-center font-semibold text-base">
						Usuario
					</h1>
				</div>
				<div className="w-[230px] h-6  mt-4">
					<h1 className="font-bold text-2xl text-white text-center">
						Mis datos
					</h1>
				</div>
				<div className="mt-8">
					<form className="grid grid-cols-1 gap-4 lg:gap-20 lg:grid-cols-2">
						<div className="gap-6">
							<div className="w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2">
									Usuario
								</p>
								<input
									type="text"
									className="text-black w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								></input>
							</div>
							<div className="w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2">Pais</p>
								<input
									type="text"
									className="text-black w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								></input>
							</div>
							<div className="w-[344px] h-14 rounded-lg bg-white p-2">
								<p className="font-normal text-xs text-slate-500 ml-2">Edad</p>
								<input
									type="text"
									className="text-black w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								></input>
							</div>
						</div>
						<div className="gap-6">
							<div className="w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2">Email</p>
								<input
									type="text"
									className="text-black w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								></input>
							</div>

							<div className="w-[344px] h-14 rounded-lg bg-white p-2 mb-6">
								<p className="font-normal text-xs text-slate-500 ml-2">
									Ciudad
								</p>
								<input
									type="text"
									className="text-black w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								></input>
							</div>
							<div className="w-full h-auto ">
								<h1 className="text-black text-2xl font-bold text-center">
									Idioma
								</h1>
								<div className="flex flex-wrap gap-2 w-full rounded-lg h-[41px] top-0 justify-center aling-center items-center ">
									<div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
									<div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
									<div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
									<div className="bg-green-600 rounded w-[41px] h-[41px]"></div>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div className="w-[295px] mt-14">
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-blueEmmagini py-5 px-10"
						textClassName="text-white font-bold text-base"
						text="Guardar"
					/>
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-sky-400 mt-2 py-5 px-10"
						textClassName="text-white font-bold text-base"
						text="Cancelar"
					/>
				</div>
			</div>
		</>
	);
}

export default Perfil;
