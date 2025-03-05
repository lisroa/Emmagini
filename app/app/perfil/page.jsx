"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import RoundButton from "@/app/components/buttons/RoundButton";
import { Label, Select } from "flowbite-react";

function Perfil() {
	const { data, empresa, userData, textos, availableLanguages } =
		useDataContext();
	const { token, userId, lang, setLang } = useAuthContext();
	const [selectedPais, setSelectedPais] = useState("");

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

	useEffect(() => {
		if (data?.paises && data.paises.length > 0 && !selectedPais) {
			setSelectedPais(data.paises[0].id);
		}
	}, [data?.paises, selectedPais]);

	//console.log("textos", textos);
	//console.log("user data", userData);
	console.log("paises", data?.paises);

	return (
		<>
			<div className="flex flex-col items-center justify-center p-4">
				<div className="w-full max-w-[230px] h-6 mt-20">
					<h1 className="font-bold text-2xl text-white text-center">
						{textos?.perfil_titulo}
					</h1>
				</div>
				<div className="mt-8 w-full px-4 md:w-[1000px] mx-auto">
					<form className="grid grid-cols-1 lg:grid-cols-2 justify-center justify-items-center">
						<div className="flex flex-col items-center w-full md:w-[500px]">
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2">
									{textos?.perfil_nombre}
								</p>
								<input
									type="text"
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2">
									{textos?.profile_alias}
								</p>
								<input
									type="text"
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2">
									{textos?.perfil_email}
								</p>
								<input
									type="text"
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2">
									{textos?.profile_fdenac}
								</p>
								<input
									type="text"
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-6 items-center w-full md:w-[500px]">
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-4">
								<p className="font-normal text-xs text-slate-500 ml-2">
									{textos?.profile_telefono}
								</p>
								<input
									type="text"
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-6">
								<p className="font-normal text-xs text-slate-500 ml-2">
									{textos?.perfil_pais}
								</p>
								<select
									value={selectedPais}
									onChange={(e) => setSelectedPais(e.target.value)}
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none appearance-none"
								>
									{data?.paises?.map((pais) => (
										<option key={pais.id} value={pais.id}>
											{pais.text}
										</option>
									))}
								</select>
							</div>

							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-4">
								<p className="font-normal text-xs text-slate-500 ml-2">
									{textos?.profile_sexo}
								</p>
								<input
									type="text"
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
							<div className="w-full h-auto">
								<h1 className="text-black text-2xl font-bold text-center">
									Idioma
								</h1>
								<div className="mt-4 flex flex-row items-center justify-center w-full gap-x-2">
									{availableLanguages?.map((l) => (
										<button
											key={l.id}
											type="button"
											onClick={() => {
												console.log("Cambiando a idioma:", l.id);
												setLang(l.id);
											}}
											className={`mb-6 transition-opacity rounded-lg ${
												lang === l.id
													? "opacity-75 border-2 border-gray-500"
													: "opacity-100"
											}`}
										>
											<Image
												src={l.icon}
												alt={l.text}
												width={48}
												height={48}
												className="mx-auto"
											/>
										</button>
									))}
								</div>
							</div>
						</div>
					</form>
				</div>

				<div className="w-full max-w-[295px] mt-20">
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-blueEmmagini py-5 px-10"
						textClassName="text-white font-bold text-base"
						text={textos?.perfil_guardar}
					/>
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-sky-400 mt-6 py-5 px-10"
						textClassName="text-white font-bold text-base"
						text={textos?.btn_completar_perfil_cancelar}
					/>
				</div>
			</div>
		</>
	);
}

export default Perfil;
