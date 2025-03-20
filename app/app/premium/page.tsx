"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useCallback } from "react";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import RoundButton from "@/app/components/buttons/RoundButton";
import Modal from "@/app/components/extras/ModalMensajes";
import imageTester from "../../../public/assets/premium-tester.png";

function Page() {
	const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
	const { token, userId, lang } = useAuthContext();
	const { data } = useDataContext();
	const [inputValue, setInputValue] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setInputValue(value);
		}
	};

	const handleSubscribeClick = () => {
		if (data.premium) {
			setShowModal(true);
			setModalText("Ya eres usuario premium");
		} else {
			if (data.gatewayurl) {
				window.open(data.gatewayurl, "_blank");
			} else {
				console.error("Error");
			}
		}
	};

	const handleButton = () => {
		setShowModal(false);
	};

	const subscribeToPremium = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/bepremium_club",
				{
					code: inputValue,
					host: `${HOST_URL}/home.php#v=inicio`,
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

			if (response.data.error === 1) {
				setModalText(response.data.message);
				setShowModal(true);
				setInputValue("");
			} else {
				setModalText("Código aceptado, premium activado.");
				setShowModal(true);
				setInputValue("");
			}
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
			setModalText(
				"Hubo un error al procesar tu solicitud. Inténtalo nuevamente."
			);
			setShowModal(true);
			setInputValue("");
		}
	}, [token, userId, inputValue, lang]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="mt-20 bg-gris rounded-lg p-[15px] w-[360px] h-[550px] md:w-[480px] md:h-[650px] lg:w-[600px] lg:h-[750px]">
				<h2 className="text-2xl font-bold text-center">Premium</h2>
				<p className="font-normal text-xs text-center">
					Ser premium tiene muchos beneficios: <br /> - Beneficio 1 sobre tal
					cosa <br /> - Beneficio 2 sobre tal cosa:
					<br /> - Beneficio 3 sobre tal cosa
				</p>
				<div className="flex justify-center mt-[10px]">
					<Image
						src={imageTester}
						alt="tester premium"
						className="w-full max-w-[337px] md:max-w-[400px] lg:max-w-[500px]"
						width={0}
						height={0}
					/>
				</div>
				<p className="text-blueEmmagini text-2xl font-bold text-center mt-[15px]">
					$5.000
				</p>
				<p className="text-blueEmmagini text-xs font-bold text-center font-medium">
					Por mes
				</p>

				<div className="flex flex-col items-center justify-center mt-[15px]">
					<RoundButton
						text="Suscribirse"
						buttonClassName="bg-blueEmmagini text-white w-[202px] h-[29px]"
						onClick={handleSubscribeClick}
					/>
					<p className="mt-[40px]">Tengo un código</p>
					<input
						type="text"
						placeholder=" - - - - - - - - "
						className="w-[320px] md:w-[400px] lg:w-[480px] h-[30px] mt-[10px] px-4 text-center border-solid border-2 border-blue-400 rounded-full"
						value={inputValue}
						onChange={handleInputChange}
					/>
					<RoundButton
						text="Cargar"
						buttonClassName="bg-blueEmmagini text-white w-[202px] h-[29px] mt-[30px]"
						onClick={subscribeToPremium}
					/>
				</div>
			</div>

			{showModal && (
				<Modal
					message={modalText}
					buttonText="Cerrar"
					onButtonClick={handleButton}
				/>
			)}
		</div>
	);
}

export default Page;
