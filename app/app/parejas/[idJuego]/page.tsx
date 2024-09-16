"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import DinamicButtonNav from "@/app/components/home/DinamicButtonNav";
import CountdownTimer from "@/app/components/extras/CountdownTimer";
import ModalMensajes from "@/app/components/extras/ModalMensajes";
import ModalGame from "@/app/components/extras/ModalGame";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdWorkspacePremium } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "@/app/components/styles/loader.css";

// @ts-ignore
const validateData = async ({ token, userId }) => {
	const response = await axios.post(
		"https://backend.emmagini.com/api2/validate",
		{
			callback: "https://demo25.emmagini.com/home.php#v=inicio",
			token,
			userid: userId,
			host: "demo25.emmagini.com",
			lang: "es",
		},
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
		}
	);

	return response.data;
};

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

const Page = ({ params: { idJuego } }: ComponentProps) => {
	const { userId, token } = useAuthContext();

	const { data, error, isLoading } = useQuery(
		["validateData", token, userId],
		() => validateData({ token, userId }),
		{
			enabled: !!token && !!userId,
			refetchOnWindowFocus: false,
		}
	);
	const router = useRouter();
	const [column1, setColumn1] = useState([]);
	const [column2, setColumn2] = useState([]);
	const [matchedDivs, setMatchedDivs] = useState([]);
	const [clickedDivs, setClickedDivs] = useState([]);
	const [responseApi, setResponseApi] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [contenidoEncontrado, setContenidoEncontrado] = useState(null);
	const [modalContent, setModalContent] = useState<any>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalGameOpen, setModalGameOpen] = useState(false);
	const [modalText, setModalText] = useState<any>(null);
	const [resetTimer, setResetTimer] = useState(false);
	const [correctAttempts, setCorrectAttempts] = useState(0);
	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
	const [timeoutCalled, setTimeoutCalled] = useState(false);

	const iniciarPartida = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/iniciar_partida",
				{
					token: token,
					userid: userId,
					id_juego: idJuego,
					id_partida: "",
					host: "demo25.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
			throw error;
		}
	}, [token, userId, idJuego]);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const apiResponse = await iniciarPartida();

			setResponseApi(apiResponse);
			console.log("response", apiResponse);
			setLoading(false);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
			setLoading(false);
		}
	}, [iniciarPartida]);

	useEffect(() => {
		if (token && userId) {
			let hasStarted = false;

			if (!hasStarted) {
				fetchData();
				hasStarted = true;
			}
		}
	}, [token, userId, fetchData]);

	useEffect(() => {
		if (data?.contenidos) {
			const contenido = data.contenidos.find(
				(item: any) => item.id === idJuego
			);
			if (contenido && contenido.data?.images) {
				const images = contenido.data.images;

				const column1Images = images.map((image: any) => ({
					id: image.id,
					url: image.img_1,
				}));
				setColumn1(column1Images);

				const column2Images = images.map((image: any) => ({
					id: image.id,
					url: image.img_2,
				}));

				const shuffledColumn2 = column2Images
					// @ts-ignore
					.map((a) => ({ sort: Math.random(), value: a }))
					// @ts-ignore
					.sort((a, b) => a.sort - b.sort)
					// @ts-ignore
					.map(({ value }) => value);

				setColumn2(shuffledColumn2);

				setContenidoEncontrado(contenido);
			} else {
				console.log("No se encontró contenido para el idJuego:", idJuego);
			}
		}
	}, [data, idJuego]);

	const finalizarPartida = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/fin_partida",
				{
					token: token,
					userid: userId,
					id_juego: idJuego,
					id_partida: responseApi?.id_partida,
					correctas: correctAttempts,
					incorrectas: incorrectAttempts,
					timeout: 0,
					host: "demo25.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			const updatedText = response.data.texto.replace(
				"%n",
				response.data.premio
			);
			const updatedContent = { ...response.data, texto: updatedText };

			setModalContent(updatedContent);

			setModalOpen(true);
			setModalText(updatedContent.texto);
		} catch (error) {
			console.error("Error al finalizar la partida:", error);
		}
	}, [
		token,
		userId,
		idJuego,
		correctAttempts,
		incorrectAttempts,
		responseApi,
		fetchData,
	]);
	const finalizarPartidaConTimeout = useCallback(async () => {
		if (timeoutCalled) return;
		setTimeoutCalled(true);

		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/fin_partida",
				{
					token: token,
					userid: userId,
					id_juego: idJuego,
					id_partida: responseApi?.id_partida,
					correctas: correctAttempts,
					incorrectas: incorrectAttempts,
					timeout: 0,
					host: "demo25.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			const updatedText = response.data.texto;
			const updatedContent = { ...response.data, texto: updatedText };

			setModalContent(updatedContent);

			setModalOpen(true);
			setModalText("Oppss! Tiempo agotado");

			await fetchData();
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
		}
	}, [
		token,
		userId,
		idJuego,
		responseApi,
		correctAttempts,
		incorrectAttempts,
		timeoutCalled,
		fetchData,
	]);
	const reiniciarPartida = useCallback(async () => {
		if (timeoutCalled) return;
		setTimeoutCalled(true);

		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/fin_partida",
				{
					token: token,
					userid: userId,
					id_juego: idJuego,
					id_partida: responseApi?.id_partida,
					correctas: correctAttempts,
					incorrectas: incorrectAttempts,
					timeout: 0,
					host: "demo25.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			const updatedText = response.data.texto;
			const updatedContent = { ...response.data, texto: updatedText };

			setModalContent(updatedContent);

			setModalGameOpen(true);
			setModalText("Partida reiniciada");
			setLoading(true);

			await fetchData();
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
		}
	}, [
		token,
		userId,
		idJuego,
		responseApi,
		correctAttempts,
		incorrectAttempts,
		timeoutCalled,
		fetchData,
	]);

	const handleDivClick = (item: any, index: any) => {
		// @ts-ignore
		if (matchedDivs.includes(index) || clickedDivs.length === 2) return;

		const newClickedDivs = [...clickedDivs, { item, index }];
		// @ts-ignore
		setClickedDivs(newClickedDivs);

		if (newClickedDivs.length === 2) {
			const [firstDiv, secondDiv] = newClickedDivs;

			if (firstDiv.item.id === secondDiv.item.id) {
				// @ts-ignore
				setMatchedDivs((prev) => [...prev, firstDiv.index, secondDiv.index]);
				setCorrectAttempts((prev) => prev + 1);
			} else {
				setIncorrectAttempts((prev) => prev + 1);
			}

			setTimeout(() => {
				setClickedDivs([]);
			}, 1000);

			// Verificar si todos los pares fueron encontrados
			if (matchedDivs.length + 2 === column1.length * 2) {
				finalizarPartida();
			}
		}
	};

	const renderDivs = (column: any, columnOffset: number) =>
		column.map((item: any, index: number) => {
			const realIndex = columnOffset + index;
			// @ts-ignore
			const isSelected = clickedDivs.some((div) => div.index === realIndex);
			// @ts-ignore
			const isMatched = matchedDivs.includes(realIndex);
			const borderColor = isMatched
				? "border-green-500"
				: isSelected
				? "border-red"
				: "border-gray-500";

			return (
				<div
					key={realIndex}
					onClick={() => handleDivClick(item, realIndex)}
					className={`w-full h-28 rounded-lg border-4 ${borderColor} ${
						isMatched ? "blur-sm cursor-not-allowed" : ""
					}`}
				>
					<Image
						src={item.url}
						alt={`Image ${realIndex}`}
						className="w-full h-full object-cover"
						style={{
							pointerEvents: isMatched ? "none" : "auto",
						}}
						width={200}
						height={200}
					/>
				</div>
			);
		});

	const handleClickBack = () => {
		router.back();
	};
	const reiniciarJuego = useCallback(async () => {
		try {
			await reiniciarPartida();

			if (modalOpen) {
				setModalOpen(false);
			}

			await fetchData();

			const contenido = data?.contenidos.find(
				(item: any) => item.id === idJuego
			);
			if (contenido && contenido.data?.images) {
				const images = contenido.data.images;

				const column1Images = images.map((image: any) => ({
					id: image.id,
					url: image.img_1,
				}));
				setColumn1(column1Images);

				const column2Images = images.map((image: any) => ({
					id: image.id,
					url: image.img_2,
				}));

				const shuffledColumn2 = column2Images
					// @ts-ignore
					.map((a) => ({ sort: Math.random(), value: a }))
					// @ts-ignore
					.sort((a, b) => a.sort - b.sort)
					// @ts-ignore
					.map(({ value }) => value);

				setColumn2(shuffledColumn2);

				setContenidoEncontrado(contenido);
			}

			setMatchedDivs([]);
			setClickedDivs([]);
			setCorrectAttempts(0);
			setIncorrectAttempts(0);
			setResetTimer(true);
		} catch (error) {
			console.error("Error al reiniciar el juego:", error);
		}
	}, [data, idJuego, finalizarPartidaConTimeout, fetchData]);

	const handleCloseModalGame = () => {
		setModalGameOpen(false);
	};

	if (isLoading) {
		return (
			<div className="mt-20 text-black">
				<div className="mt-96">
					<section className="dots-container">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</section>
					<h1 className="text-white text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	if (error) {
		return console.error(error);
	}

	return (
		<>
			<div className="mt-24">
				<h1 className="text-white text-center text-2xl font-bold">
					{/*// @ts-ignore */}
					{contenidoEncontrado?.titulo || ""}
				</h1>
				<h1 className="text-white text-center text-base font-medium mt-4">
					{/*// @ts-ignore */}
					{contenidoEncontrado?.extra || ""}
				</h1>
				<CountdownTimer
					duration={300}
					onTimeOut={finalizarPartidaConTimeout}
					resetTimer={resetTimer}
				/>
				<div className="flex justify-center gap-2 md:gap-36 mt-4 p-[5px]">
					<div className="flex flex-col gap-6 w-[200px] h-auto">
						{renderDivs(column1, 0)}
					</div>

					<div className="flex flex-col gap-6 w-[200px] h-auto">
						{renderDivs(column2, column1.length)}
					</div>
				</div>
			</div>

			<DinamicButtonNav
				icon1={<GrPowerReset size={25} className="text-white" />}
				icon2={<MdWorkspacePremium size={25} className="text-white" />}
				icon3={<IoMdArrowRoundBack size={25} className="text-white" />}
				texto1="Reiniciar"
				texto2="Premium"
				texto3="Volver"
				onClick1={reiniciarJuego}
				onClick3={handleClickBack}
			/>
			{modalOpen && <ModalMensajes message={modalText || modalContent.texto} />}
			{modalGameOpen && (
				<ModalGame
					message={modalText}
					textButton="Jugar"
					onClick={handleCloseModalGame}
				/>
			)}
		</>
	);
};

export default Page;
