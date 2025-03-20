"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import CountdownTimer from "@/app/components/extras/CountdownTimer";
import RoundButton from "@/app/components/buttons/RoundButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModalMensajes from "@/app/components/extras/ModalMensajes";
import ModalGame from "@/app/components/extras/ModalGame";
import DinamicButtonNav from "@/app/components/home/DinamicButtonNav";
import ModalAyuda from "@/app/components/extras/modalAyuda";
import Ruleta from "@/app/components/ruleta/Ruleta";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdWorkspacePremium } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "@/app/components/styles/loader.css";

const shuffleArray = (array: any[]) => {
	return array
		.map((item) => ({ sort: Math.random(), value: item }))
		.sort((a, b) => a.sort - b.sort)
		.map((obj) => obj.value);
};

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

function Page({ params: { idJuego } }: ComponentProps) {
	const router = useRouter();
	const { refetchAppData, infoGames } = useDataContext();
	const { userId, token, lang } = useAuthContext();
	const [responseApi, setResponseApi] = useState<any>(null);
	const [idPartida, setIdPartida] = useState<any>(null);
	const [images, setImages] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [orden, setOrden] = useState<any[]>([]);
	const [resultErrors, setResultErrors] = useState<any[]>([]);
	const [correctCount, setCorrectCount] = useState(0);
	const [incorrectCount, setIncorrectCount] = useState(0);
	const [modalContent, setModalContent] = useState<any>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalGameOpen, setModalGameOpen] = useState(false);
	const [modalText, setModalText] = useState<any>(null);
	const [isHelpModalOpen, setIsHelpModalOpen] = useState(true);
	const [showRuleta, setShowRuleta] = useState(false);
	const [buttonText, setButtonText] = useState<string>("Volver");
	const [showRuletaButton, setShowRuletaButton] = useState<boolean>(false);
	const [gameStarted, setGameStarted] = useState(false);

	const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

	const game = infoGames?.find((gameItem: any) => gameItem.id === idJuego);

	useEffect(() => {
		const hideModal = localStorage.getItem(`hideModal_${idJuego}`);
		if (hideModal === "true") {
			setIsHelpModalOpen(false);
			setGameStarted(true);
		}
	}, [idJuego]);

	const handleStartGame = () => {
		setIsHelpModalOpen(false);
		setGameStarted(true);
	};

	useEffect(() => {
		if (game?.data?.images) {
			const shuffled = shuffleArray(game.data.images);
			setImages(shuffled);
		}
	}, [game]);

	const iniciarPartida = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/iniciar_partida",
				{
					token: token,
					userid: userId,
					id_juego: idJuego,
					id_partida: "",
					host: HOST_URL,
					lang: lang,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);
			setIdPartida(response.data.id_partida);
			return response.data;
		} catch (error) {
			console.error("Error al iniciar partida", error);
			throw error;
		}
	}, [token, userId, idJuego, lang]);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const apiResponse = await iniciarPartida();
			setResponseApi(apiResponse);
			setLoading(false);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
			setLoading(false);
		}
	}, [iniciarPartida]);

	useEffect(() => {
		if (token && userId) {
			fetchData();
		}
	}, [token, userId, fetchData]);

	const onDragEnd = (result: any) => {
		if (!result.destination) return;

		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;
		const sourceImage = images[sourceIndex];
		const destinationImage = images[destinationIndex];

		const sourceIsCorrect = resultErrors.find(
			(err: any) => err.id === sourceImage.id && err.error === 0
		);
		const destinationIsCorrect = resultErrors.find(
			(err: any) => err.id === destinationImage.id && err.error === 0
		);

		if (sourceIsCorrect || destinationIsCorrect) return;

		const items = Array.from(images);
		[items[sourceIndex], items[destinationIndex]] = [
			items[destinationIndex],
			items[sourceIndex],
		];

		setImages(items);
		const orderedData = items.map((image, index) => ({
			i: index + 1,
			o: image.id,
		}));
		setOrden(orderedData);
	};

	const finalizarPartida = useCallback(
		async (isTimeout: boolean) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/fin_partida",
					{
						token: token,
						userid: userId,
						id_juego: idJuego,
						id_partida: responseApi?.id_partida,
						correctas: correctCount,
						incorrectas: incorrectCount,
						timeout: isTimeout ? 1 : 0,
						host: HOST_URL,
						lang: lang,
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
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
				resetGameState();
				refetchAppData();
				if (response.data.ruleta === 1) {
					setGameStarted(false);
					setButtonText("Multiplica tu premio");
					setShowRuletaButton(true);
				} else {
					setButtonText("Volver");
					setShowRuletaButton(false);
				}
				setGameStarted(false);
			} catch (error) {
				console.error("Error al finalizar la partida:", error);
			}
		},
		[
			token,
			userId,
			lang,
			idJuego,
			correctCount,
			incorrectCount,
			responseApi,
			refetchAppData,
		]
	);

	const verificarOrden = useCallback(async () => {
		try {
			const formattedData =
				orden.length === 0
					? images.map((image, index) => ({
							i: index + 1,
							o: image.id,
					  }))
					: orden.map((item) => ({
							i: item.i,
							o: item.o,
					  }));

			const response = await axios.post(
				"https://backend.emmagini.com/api2/lineatiempo_controlar",
				{
					token: token,
					userid: userId,
					id_juego: idJuego,
					data: JSON.stringify(formattedData),
					host: HOST_URL,
					lang: lang,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			setResultErrors(response.data.result);

			const correct = response.data.result.filter(
				(result: any) => result.error === 0
			).length;
			const incorrect = response.data.result.filter(
				(result: any) => result.error === 1
			).length;

			setCorrectCount(correct);
			setIncorrectCount(incorrect);

			if (incorrect === 0) {
				finalizarPartida(false);
			}
		} catch (error) {
			console.error("Error al verificar el orden:", error);
		}
	}, [token, userId, idJuego, lang, orden, images, finalizarPartida]);

	const resetGameState = () => {
		setImages([]);
		setOrden([]);
		setResultErrors([]);
		setCorrectCount(0);
		setIncorrectCount(0);
		setResponseApi(null);
	};

	const handleClickBack = () => {
		router.back();
	};

	const handleCloseModalGame = () => {
		setModalGameOpen(false);
	};

	function handleVerification() {
		verificarOrden();
	}

	const handleModalButtonClick = () => {
		if (showRuletaButton) {
			setModalOpen(false);
			setTimeout(() => setShowRuleta(true), 200);
		} else {
			router.back();
		}
	};

	if (!infoGames && loading) {
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
					<h1 className="text-blueEmmagini text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	return (
		<>
			<ModalAyuda
				isOpen={isHelpModalOpen}
				text={game?.extra}
				textButton="Jugar"
				image={game?.imagen_ayuda}
				onClick={handleStartGame}
				idJuego={idJuego}
			/>

			<div className="flex flex-col items-center justify-center min-h-screen mt-20">
				<h1 className="text-white text-center text-2xl font-bold">
					{game?.titulo}
				</h1>
				<h2 className="text-white text-center text-base font-medium mt-4">
					{game?.extra || ""}
				</h2>

				<CountdownTimer
					start={gameStarted}
					duration={game?.tiempo || 60}
					onTimeOut={() => finalizarPartida(true)}
					resetTimer={false}
				/>

				<RoundButton
					buttonClassName="bg-lime-600 w-[240px] h-[29px] mt-4"
					text="Validar"
					textClassName="text-white"
					onClick={handleVerification}
				/>

				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className="grid grid-cols-1 gap-4 mt-8 pb-[100px]"
							>
								{images.map((image: any, index: number) => {
									const error = resultErrors.find(
										(result) => result.id === image.id
									);
									const isCorrect = error && error.error === 0;

									return (
										<Draggable
											key={image.id}
											draggableId={image.id}
											index={index}
											isDragDisabled={isCorrect}
										>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className={`w-[215px] h-[120px] relative rounded-lg mx-auto box-border ${
														isCorrect ? "border-[6px] border-[#1b943a]" : ""
													}`}
												>
													<Image
														src={image.img}
														alt={`Imagen ${index}`}
														className="w-full h-full object-cover rounded-lg"
														fill
													/>
												</div>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				{modalOpen && (
					<ModalMensajes
						message={modalText || modalContent.texto}
						buttonText="Volver"
						onButtonClick={handleClickBack}
					/>
				)}
				{modalGameOpen && (
					<ModalGame
						message={modalText}
						textButton="Jugar"
						onClick={handleCloseModalGame}
					/>
				)}
				{modalOpen && (
					<ModalMensajes
						message={modalText || ""}
						buttonText={buttonText}
						onButtonClick={handleModalButtonClick}
					/>
				)}
				{showRuleta && <Ruleta idPartida={idPartida} />}

				<DinamicButtonNav
					icon1={<GrPowerReset size={25} className="text-white" />}
					icon2={<MdWorkspacePremium size={25} className="text-white" />}
					icon3={<IoMdArrowRoundBack size={25} className="text-white" />}
					texto1="Reiniciar"
					texto2="Premium"
					texto3="Volver"
					onClick3={handleClickBack}
				/>
			</div>
		</>
	);
}

export default Page;
