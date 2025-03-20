"use client";
import { useEffect, useState, useId, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import RoundButton from "@/app/components/buttons/RoundButton";
import Calendar from "@/components/CalendarComponent";
import ModalMensajes from "@/app/components/extras/ModalMensajes";
import "@/app/components/styles/loader.css";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function Perfil() {
	const { data, empresa, userData, textos, availableLanguages } =
		useDataContext();
	const { token, userId, lang, setLang } = useAuthContext();
	const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
	const id = useId();
	const router = useRouter();
	const [selectedPais, setSelectedPais] = useState("");
	const [nombre, setNombre] = useState(userData?.nombre || "");
	const [alias, setAlias] = useState(userData?.alias || "");
	const [email, setEmail] = useState(userData?.email || "");
	const [fdnac, setFdnac] = useState(userData?.fdnac || "");
	const [telefono, setTelefono] = useState(userData?.telefono || "");
	const [sexo, setSexo] = useState(userData?.sexo || "");
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const isLoading = !data || !userData || !textos;

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

	useEffect(() => {
		if (userData) {
			setNombre(userData.nombre || "");
			setAlias(userData.alias || "");
			setEmail(userData.email || "");
			setFdnac(userData.fdnac || "");
			setTelefono(userData.telefono || "");
			setSexo(userData.sexo || "");
		}
	}, [userData]);

	const updateUserData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/profile",
				{
					uname: nombre,
					email: email,
					fdnac: fdnac,
					pais: selectedPais,
					sexo: sexo,
					club: "",
					tel: telefono,
					domicilio: "",
					alias: alias,
					dni: "",
					host: HOST_URL,
					callback: `https://${HOST_URL}/home.php#v=profile`,
					token: token,
					userid: userId,
					lang: lang,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			setModalMessage(response.data.mensaje);
			setShowModal(true);
			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
			throw error;
		}
	}, [
		nombre,
		email,
		fdnac,
		selectedPais,
		sexo,
		telefono,
		alias,
		token,
		userId,
		lang,
	]);

	const onClickPasswordButton = () => {
		router.push("/app/perfil/password");
	};

	if (isLoading) {
		return (
			<div className="mt-20 text-blueEmmagini">
				<div className="mt-96">
					<section className="dots-container">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</section>
					<h1 className="text-blueEmmagini text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center p-4">
				<div className="w-full max-w-[230px] h-6 mt-20">
					<h1 className="font-bold text-2xl text-white text-center first-letter:uppercase">
						{textos?.perfil_titulo}
					</h1>
				</div>
				<div className="mt-8 w-full px-4 md:w-[1000px] mx-auto">
					<form className="grid grid-cols-1 lg:grid-cols-2 justify-center justify-items-center">
						<div className="flex flex-col items-center w-full md:w-[500px]">
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2 first-letter:uppercase">
									{textos?.perfil_nombre}
								</p>
								<input
									type="text"
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
									placeholder={userData?.nombre}
								/>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2 first-letter:uppercase">
									{textos?.profile_alias}
								</p>
								<input
									type="text"
									value={alias}
									onChange={(e) => setAlias(e.target.value)}
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
									placeholder={userData?.alias}
								/>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2 first-letter:uppercase">
									{textos?.perfil_email}
								</p>
								<input
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
									placeholder={userData?.email}
								/>
							</div>
							<div className="w-full max-w-[344px] h-20 rounded-lg bg-white p-2 mb-10">
								<Calendar
									text={textos?.profile_fdenac}
									onSelect={setFdnac}
									value={fdnac}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-6 items-center w-full md:w-[500px]">
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-4">
								<p className="font-normal text-xs text-slate-500 ml-2 first-letter:uppercase">
									{textos?.profile_telefono}
								</p>
								<input
									type="text"
									value={telefono}
									onChange={(e) => setTelefono(e.target.value)}
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
									placeholder={userData?.telefono}
								/>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-4">
								<div className="*:not-first:mt-2">
									<Select className="border-none">
										<SelectTrigger id={id} className="border-none">
											<SelectValue placeholder="Selecciona un pais" />
										</SelectTrigger>
										<SelectContent className="border-none">
											{data?.paises?.map((pais) => (
												<SelectItem
													value={pais.id}
													key={pais.id}
													className="border-none"
													onSelect={() => setSelectedPais(pais.id)}
												>
													{pais.text}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-2">
								<div className="*:not-first:mt-2">
									<Select>
										<SelectTrigger id={id} className="border-none">
											<SelectValue placeholder={textos?.profile_sexo} />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1" onSelect={() => setSexo("1")}>
												{textos?.profile_sexo_nsnc}
											</SelectItem>
											<SelectItem value="2" onSelect={() => setSexo("2")}>
												{textos?.profile_sexo_fem}
											</SelectItem>
											<SelectItem value="3" onSelect={() => setSexo("3")}>
												{textos?.profile_sexo_masc}
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="w-full h-auto">
								<h1 className="text-white text-2xl font-bold text-center first-letter:uppercase">
									{textos?.btn_idioma}
								</h1>
								<div className="mt-4 flex flex-row items-center justify-center w-full gap-x-2">
									{availableLanguages?.map((l) => (
										<button
											key={l.id}
											type="button"
											onClick={() => setLang(l.id)}
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

				<div className="w-full max-w-[295px] mt-12">
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-blueEmmagini py-5 px-10"
						textClassName="text-white font-bold text-base first-letter:uppercase"
						text={textos?.perfil_guardar}
						onClick={updateUserData}
					/>
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-[#f0ad4e] mt-6 py-5 px-10"
						textClassName="text-white font-bold text-base first-letter:uppercase"
						text={textos?.btn_password}
						onClick={onClickPasswordButton}
					/>
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-sky-400 mt-6 py-5 px-10"
						textClassName="text-white font-bold text-base"
						text={textos?.btn_completar_perfil_cancelar}
						onClick={() => router.push("/app")}
					/>
				</div>
			</div>
			{showModal && (
				<ModalMensajes
					message={modalMessage}
					buttonText="Volver"
					onButtonClick={() => router.push("/app")}
				/>
			)}
		</>
	);
}

export default Perfil;
