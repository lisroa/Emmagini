import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import Board from "./Board/Board";
import CountdownTimer from "@/app/components/extras/CountdownTimer";
import ModalMensajes from "@/app/components/extras/ModalMensajes";
import DinamicButtonNav from "@/app/components/home/DinamicButtonNav";
import ConfettiExplosion from "react-confetti-explosion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdWorkspacePremium } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "../memotest/styles.css";

interface AppProps {
	idDelJuego: string;
	idPartida: string;
	iniciarPartida: () => Promise<any>;
}

const App: React.FC<AppProps> = ({ idDelJuego, idPartida, iniciarPartida }) => {
	const router = useRouter();
	const { data } = useDataContext();
	const { token, userId } = useAuthContext();
	const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState<any[]>([]);
	const [selectedMemoBlock, setSelectedMemoBlock] = useState<any | null>(null);
	const [animating, setAnimating] = useState(false);
	const [successfulAttempts, setSuccessfulAttempts] = useState(0);
	const [failedAttempts, setFailedAttempts] = useState(0);
	const [pairsFound, setPairsFound] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [timeoutCalled, setTimeoutCalled] = useState(false);
	const [resetTimer, setResetTimer] = useState(false);
	const [modalContent, setModalContent] = useState<any>(null);
	const [modalText, setModalText] = useState<any>(null);
	const [confettiVisible, setConfettiVisible] = useState(false);
	const [cover, setCover] = useState<string>("");

	useEffect(() => {
		if (data && data.contenidos) {
			const contenido = data.contenidos.find(
				(contenido: any) => contenido.id === idDelJuego
			);

			if (contenido && contenido.data && contenido.data.images) {
				const imagesList = contenido.data.images.map((image: any) => ({
					id: image.id,
					img: image.img,
				}));

				const shuffledImageList = shuffleArray([...imagesList, ...imagesList]);

				setShuffledMemoBlocks(
					shuffledImageList.map((image, i) => ({
						index: i,
						id: image.id,
						img: image.img,
						flipped: false,
					}))
				);

				setCover(contenido.data.cover);
			}
		}
	}, [data, idDelJuego]);

	useEffect(() => {
		console.log("cover", cover);
	}, [data, cover]);

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

			const updatedText = response.data.texto.replace(
				"%n",
				response.data.premio
			);
			const updatedContent = { ...response.data, texto: updatedText };

			setModalContent(updatedContent);
			setConfettiVisible(true);
			setModalOpen(true);
			setModalText(modalContent.texto);
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
	const finalizarPartidaConTimeout = useCallback(async () => {
		if (timeoutCalled) return;
		setTimeoutCalled(true);

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
					timeout: 1,
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
			setConfettiVisible(true);
			setModalOpen(true);
			setModalText("Oppss! Tiempo agotado");
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
		timeoutCalled,
	]);
	const reiniciarJuego = async () => {
		try {
			await finalizarPartidaConTimeout();

			const nuevaPartida = await iniciarPartida();

			if (nuevaPartida && nuevaPartida.id_partida) {
				const shuffledImageList = shuffleArray([
					...shuffledMemoBlocks.map((block) => ({
						id: block.id,
						img: block.img,
					})),
					...shuffledMemoBlocks.map((block) => ({
						id: block.id,
						img: block.img,
					})),
				]);

				setShuffledMemoBlocks(
					shuffledImageList.map((image, i) => ({
						index: i,
						id: image.id,
						img: image.img,
						flipped: false,
					}))
				);

				setSelectedMemoBlock(null);
				setSuccessfulAttempts(0);
				setFailedAttempts(0);
				setPairsFound(0);
				setAnimating(false);
				setConfettiVisible(false);
				setModalOpen(false);
				setTimeoutCalled(false);
				setResetTimer(true);
				setTimeout(() => setResetTimer(false), 100);
			}
		} catch (error) {
			console.error("Error al reiniciar la partida", error);
		}
	};
	const handleClickBack = () => {
		router.back();
	};

	console.log("modal", modalContent);

	return (
		<div>
			<h1 className="mt-20 text-white text-center text-2xl font-bold">
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
			<CountdownTimer
				duration={300}
				onTimeOut={finalizarPartidaConTimeout}
				resetTimer={resetTimer}
			/>
			<Board
				memoBlocks={shuffledMemoBlocks}
				animating={animating}
				handleMemoClick={handleMemoClick}
				cover={cover}
			/>
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
			{modalOpen && <ModalMensajes message={modalText} />}
		</div>
	);
};

export default App;
