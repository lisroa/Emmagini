"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
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

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

function Page({ params: { idJuego } }: ComponentProps) {
	const router = useRouter();
	const { refetchAppData, infoGames } = useDataContext();
	const { userId, token } = useAuthContext();
	const [responseApi, setResponseApi] = useState<any>(null);
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

	const game = infoGames?.find((gameItem: any) => gameItem.id === idJuego);

	const handleStartGame = () => {
		setIsHelpModalOpen(false);
	};

	useEffect(() => {
		if (game?.data?.images) {
			setImages(game.data.images);
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
					host: "demo14.emmagini.com",
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

		const correctIndices = resultErrors
			.filter((error) => error.error === 0)
			.map((error) => images.findIndex((image) => image.id === error.id));

		const isSourceCorrect = correctIndices.includes(sourceIndex);
		const isDestinationCorrect = correctIndices.includes(destinationIndex);

		if (isSourceCorrect) return;

		const items = Array.from(images);

		if (!isDestinationCorrect) {
			const [movedItem] = items.splice(sourceIndex, 1);
			items.splice(destinationIndex, 0, movedItem);

			setImages(items);

			const orderedData = items.map((image, index) => ({
				i: index + 1,
				o: image.id,
			}));
			setOrden(orderedData);
		}
	};

	const verificarOrden = useCallback(async () => {
		try {
			const formattedData = orden.map((item) => ({
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
					host: "demo14.emmagini.com",
					lang: "es",
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
				await finalizarPartida();
			}
		} catch (error) {
			console.error("Error al verificar el orden:", error);
		}
	}, [token, userId, idJuego, orden]);

	const finalizarPartida = useCallback(async () => {
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
					timeout: 0,
					host: "demo14.emmagini.com",
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
			resetGameState();
			refetchAppData();
			if (response.data.ruleta === 1) {
				setButtonText("Multiplica tu premio");
				setShowRuletaButton(true);
			} else {
				setButtonText("Volver");
				setShowRuletaButton(false);
			}
		} catch (error) {
			console.error("Error al finalizar la partida:", error);
		}
	}, [
		token,
		userId,
		idJuego,
		correctCount,
		incorrectCount,
		responseApi,
		refetchAppData,
	]);

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
					<h1 className="text-white text-center mt-4 font-bold text-xl">
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
				<h1 className="text-white text-center text-base font-medium mt-4">
					{game?.extra || ""}
				</h1>

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
													className={`w-[200px] h-[120px] relative rounded-lg mx-auto ${
														isCorrect ? "border-[4px] border-green-500" : ""
													}`}
												>
													<Image
														src={image.img}
														alt={`product image ${index}`}
														className="w-[200px] h-[120px] object-cover rounded-lg"
														layout="fill"
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
				{showRuleta && <Ruleta idPartida={responseApi?.id_partida} />}

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

// Juego sin el dragg and drop

/*"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import ModalMensajes from "@/app/components/extras/ModalMensajes";
import "@/app/components/styles/loader.css";

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

function Page({ params: { idJuego } }: ComponentProps) {
	const { infoGames } = useDataContext();
	const { userId, token } = useAuthContext();
	const [responseApi, setResponseApi] = useState<any>(null);
	const [images, setImages] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [orden, setOrden] = useState<any[]>([]);
	const [resultErrors, setResultErrors] = useState<any[]>([]);
	const [correctCount, setCorrectCount] = useState(0);
	const [incorrectCount, setIncorrectCount] = useState(0);
	const [modalContent, setModalContent] = useState<any>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalText, setModalText] = useState<any>(null);
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

	const game = infoGames?.find((gameItem: any) => gameItem.id === idJuego);

	useEffect(() => {
		if (game?.data?.images) {
			setImages(game.data.images);
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

	const handleDragStart = (index: number) => {
		setDraggingIndex(index);
	};

	const handleDragOver = (index: number) => {
		if (draggingIndex === null) return;

		const newImages = [...images];
		const draggedImage = newImages[draggingIndex];

		newImages.splice(draggingIndex, 1);
		newImages.splice(index, 0, draggedImage);

		setDraggingIndex(index);
		setImages(newImages);
		setOrden(newImages.map((img, idx) => ({ i: idx + 1, o: img.id })));
	};

	const handleDragEnd = () => {
		setDraggingIndex(null);
	};

	const finalizarPartida = useCallback(async () => {
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

			resetGameState();
		} catch (error) {
			console.error("Error al finalizar la partida:", error);
		}
	}, [token, userId, idJuego, correctCount, incorrectCount, responseApi]);

	const verificarOrden = useCallback(async () => {
		try {
			const formattedData = orden.map((item) => ({
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
					host: "demo25.emmagini.com",
					lang: "es",
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
				await finalizarPartida();
			}
		} catch (error) {
			console.error("Error al verificar el orden:", error);
		}
	}, [token, userId, idJuego, orden, finalizarPartida]);

	function handleVerification() {
		verificarOrden();
	}

	const resetGameState = () => {
		setImages([]);
		setOrden([]);
		setResultErrors([]);
		setCorrectCount(0);
		setIncorrectCount(0);
		setResponseApi(null);
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
					<h1 className="text-white text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen mt-20">
			<h1 className="text-white text-center text-2xl font-bold">
				{game?.titulo}
			</h1>
			<h1 className="text-white text-center text-base font-medium mt-4">
				{game?.extra || ""}
			</h1>

			<RoundButton
				buttonClassName="bg-lime-600 w-[240px] h-[29px] mt-4"
				text="Validar"
				textClassName="text-white"
				onClick={handleVerification}
			/>

			<div className="grid grid-cols-1 gap-4 mt-8">
				{images.map((image: any, index: number) => {
					const error = resultErrors.find((result) => result.id === image.id);
					const isCorrect = error && error.error === 0;

					return (
						<div
							key={image.id}
							draggable
							onDragStart={() => handleDragStart(index)}
							onDragOver={() => handleDragOver(index)}
							onDragEnd={handleDragEnd}
							className={`w-[200px] h-[120px] relative rounded-lg mx-auto transition-transform duration-300 hover:scale-105 ${
								isCorrect ? "border-[4px] border-green-500" : ""
							}`}
						>
							<Image
								src={image.img}
								alt={`product image ${index}`}
								className="w-[200px] h-[120px] object-cover rounded-lg"
								layout="fill"
							/>
						</div>
					);
				})}
			</div>

			{modalOpen && <ModalMensajes message={modalText || modalContent.texto} />}
		</div>
	);
}

export default Page; */
