import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import Board from "./Board/Board";
import ModalMensajes from "@/app/components/extras/ModalMensajes";
import ConfettiExplosion from "react-confetti-explosion";
import "../memotest/styles.css";

interface AppProps {
	idDelJuego: string;
	idPartida: string;
}

const App: React.FC<AppProps> = ({ idDelJuego, idPartida }) => {
	const { data } = useDataContext();
	const { token, userId } = useAuthContext();
	const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState<any[]>([]);
	const [selectedMemoBlock, setSelectedMemoBlock] = useState<any | null>(null);
	const [animating, setAnimating] = useState(false);
	const [successfulAttempts, setSuccessfulAttempts] = useState(0);
	const [failedAttempts, setFailedAttempts] = useState(0);
	const [pairsFound, setPairsFound] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState<any>(null);
	const [confettiVisible, setConfettiVisible] = useState(false);
	const [cover, setCover] = useState<string>("");

	useEffect(() => {
		if (data && data.contenidos) {
			// Encuentra el contenido que coincida con el idDelJuego
			const contenido = data.contenidos.find(
				(contenido: any) => contenido.id === idDelJuego
			);

			// Si encontramos el contenido y tiene imágenes
			if (contenido && contenido.data && contenido.data.images) {
				// Extrae la lista de imágenes
				const imagesList = contenido.data.images.map((image: any) => ({
					id: image.id,
					img: image.img,
				}));

				// Baraja las imágenes
				const shuffledImageList = shuffleArray([...imagesList, ...imagesList]);

				// Establece las imágenes en el estado
				setShuffledMemoBlocks(
					shuffledImageList.map((image, i) => ({
						index: i,
						id: image.id,
						img: image.img,
						flipped: false,
					}))
				);

				// Establece el cover en el estado
				setCover(contenido.data.cover);
			}
		}
	}, [data, idDelJuego]);

	const shuffleArray = (a: any[]) => {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	};

	const handleMemoClick = (memoBlock: any) => {
		if (animating || memoBlock.flipped) return;

		const flippedMemoBlock = { ...memoBlock, flipped: true };
		let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
		shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
		setShuffledMemoBlocks(shuffledMemoBlocksCopy);

		if (selectedMemoBlock === null) {
			setSelectedMemoBlock(memoBlock);
		} else if (selectedMemoBlock.id === memoBlock.id) {
			setSelectedMemoBlock(null);
			setSuccessfulAttempts((prev) => prev + 1);
			setPairsFound((prev) => prev + 1);

			if (pairsFound + 1 === shuffledMemoBlocks.length / 2) {
				finalizarPartida();
			}
		} else {
			setAnimating(true);
			setTimeout(() => {
				shuffledMemoBlocksCopy.splice(memoBlock.index, 1, {
					...memoBlock,
					flipped: false,
				});
				shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, {
					...selectedMemoBlock,
					flipped: false,
				});
				setShuffledMemoBlocks(shuffledMemoBlocksCopy);
				setSelectedMemoBlock(null);
				setAnimating(false);
				setFailedAttempts((prev) => prev + 1);
			}, 1000);
		}
	};

	const finalizarPartida = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/fin_partida",
				{
					token: token,
					userid: userId,
					id_juego: idDelJuego,
					id_partida: idPartida,
					correctas: successfulAttempts,
					incorrectas: failedAttempts,
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

			console.log("Partida finalizada exitosamente:", response.data);

			const updatedText = response.data.texto.replace(
				"%n",
				response.data.premio
			);
			const updatedContent = { ...response.data, texto: updatedText };

			setModalContent(updatedContent);
			setConfettiVisible(true);
			setModalOpen(true);
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
		}
	}, [
		token,
		userId,
		idDelJuego,
		idPartida,
		successfulAttempts,
		failedAttempts,
	]);

	return (
		<div>
			<h1 className="mt-20 text-white text-center">
				{
					data?.contenidos.find((contenido: any) => contenido.id === idDelJuego)
						?.nombre
				}
			</h1>
			<h2 className="mt-6 text-white text-center">
				{
					data?.contenidos.find((contenido: any) => contenido.id === idDelJuego)
						?.extra
				}
			</h2>
			<Board
				memoBlocks={shuffledMemoBlocks}
				animating={animating}
				handleMemoClick={handleMemoClick}
				cover={cover}
			/>
			{confettiVisible && (
				<ConfettiExplosion
					particleCount={100}
					particleSize={12}
					duration={2200}
					onComplete={() => console.log("Confetti explosion complete")}
					colors={["#FFC700", "#FF0000", "#2E3191", "#41BBC7"]}
					force={0.7}
					height="120vh"
					width={1000}
				/>
			)}
			{modalOpen && <ModalMensajes message={modalContent.texto} />}
		</div>
	);
};

export default App;
