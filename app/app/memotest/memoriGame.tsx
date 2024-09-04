"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import Board from "./Board/Board";
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

	useEffect(() => {
		if (
			data &&
			data.contenidos &&
			data.contenidos[3] &&
			data.contenidos[3].data &&
			data.contenidos[3].data.images
		) {
			const imagesList = data.contenidos[3].data.images.map((image: any) => ({
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
		}
	}, [data]);

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
			<Board
				memoBlocks={shuffledMemoBlocks}
				animating={animating}
				handleMemoClick={handleMemoClick}
			/>
		</div>
	);
};

export default App;
