"use client";
import { useEffect, useState, useId, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import RoundButton from "@/app/components/buttons/RoundButton";
import ModalMensajes from "@/app/components/extras/ModalMensajes";
import "@/app/components/styles/loader.css";

function Page() {
	const { empresa, textos } = useDataContext();
	const { token, userId, lang } = useAuthContext();
	const router = useRouter();
	const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const isLoading = !textos || !empresa;

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

	const updateUserPassword = useCallback(async () => {
		console.log("✅ HOST_URL cargado:", HOST_URL);
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/password",
				{
					password_1: newPassword,
					password_2: repeatPassword,
					host: HOST_URL,
					callback: `https://${HOST_URL}/home.php#v=password&back=profile`,
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
	}, [newPassword, repeatPassword, token, userId, lang]);

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
						{textos?.password_titulo}
					</h1>
				</div>
				<div className="mt-8 w-full px-4 md:w-[1000px] mx-auto">
					<form className="grid grid-cols-1 lg:grid-cols-2 justify-center justify-items-center">
						<div className="flex flex-col items-center w-full md:w-[500px]">
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-10">
								<p className="font-normal text-xs text-slate-500 ml-2 first-letter:uppercase">
									Contraseña nueva
								</p>
								<input
									type="password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-6 items-center w-full md:w-[500px]">
							<div className="w-full max-w-[344px] h-14 rounded-lg bg-white p-2 mb-4">
								<p className="font-normal text-xs text-slate-500 ml-2 first-letter:uppercase">
									Repetir Contraseña
								</p>
								<input
									type="password"
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
									className="text-black w-full max-w-[330px] h-[20px] focus:outline-none focus:ring-0 bg-white border-none"
								/>
							</div>
						</div>
					</form>
				</div>

				<div className="w-full max-w-[295px] mt-12">
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-blueEmmagini py-5 px-10"
						textClassName="text-white font-bold text-base first-letter:uppercase"
						text={textos?.perfil_guardar}
						onClick={updateUserPassword}
					/>
					<RoundButton
						buttonClassName="w-full h-[45.37px] bg-sky-400 mt-6 py-5 px-10"
						textClassName="text-white font-bold text-base"
						text={textos?.btn_completar_perfil_cancelar}
						onClick={() => router.push("/app/perfil")}
					/>
				</div>
			</div>
			{showModal && (
				<ModalMensajes
					message={modalMessage}
					buttonText="Cerrar"
					onButtonClick={() => router.push("/app/perfil")}
				/>
			)}
		</>
	);
}

export default Page;
