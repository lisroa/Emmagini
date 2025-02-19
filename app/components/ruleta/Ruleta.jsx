"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import Board from "./Boooard/Board";
import Modal from "../extras/ModalMensajes";
import "@/app/components/ruleta/styles.css";

const multiplierList = ["x1", "x2", "x3", "x1", "x1", "x1", "x2", "x3", "x10"];

const App = ({ idPartida }) => {
	const { token, userId, lang } = useAuthContext();
	const { refetchAppData } = useDataContext();
	const router = useRouter();
	const [shuffledBlocks, setShuffledBlocks] = useState([]);
	const [animating, setAnimating] = useState(false);
	const [gameLocked, setGameLocked] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalText, setModalText] = useState("");

	const initializeGame = () => {
		const shuffledList = multiplierList.map((value, index) => ({
			index,
			value,
			flipped: false,
			premio: "",
		}));
		setShuffledBlocks(shuffledList);
		setAnimating(false);
		setGameLocked(false);
		setModalVisible(false);
	};

	useEffect(() => {
		initializeGame();
	}, []);

	const girarRuleta = useCallback(
		async (clickedBlock) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/tirar_ruleta",
					{
						token: token,
						userid: userId,
						host: "demo14.emmagini.com",
						lang: lang,
						id: idPartida,
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				const { mensaje, premio_x, premio } = response.data;

				const updatedBlocks = shuffledBlocks.map((block) =>
					block.index === clickedBlock.index
						? { ...block, flipped: true, premio: premio_x }
						: { ...block, flipped: true }
				);

				setShuffledBlocks(updatedBlocks);

				setTimeout(() => {
					setModalText(
						`${mensaje}. Tu premio x${premio_x}\nPremio total: ${premio}`
					);
					setModalVisible(true);
				}, 1000);

				refetchAppData();
				setAnimating(false);
			} catch (error) {
				console.error("Error al hacer la solicitud", error);
				setAnimating(false);
			}
		},
		[token, userId, lang, idPartida, shuffledBlocks, refetchAppData]
	);

	const handleMemoClick = (clickedBlock) => {
		if (animating || clickedBlock.flipped || gameLocked) return;

		setAnimating(true);
		setGameLocked(true);

		girarRuleta(clickedBlock);
	};

	const handleModalClose = () => {
		setModalVisible(false);
		router.back();
	};

	return (
		<div className="container-app">
			<div className="container">
				<h1 className="text-center text-white text-3xl font-bold">
					Elige una carta para multiplicar tu premio
				</h1>
				<Board
					memoBlocks={shuffledBlocks}
					animating={animating}
					handleMemoClick={handleMemoClick}
				/>
			</div>
			{modalVisible && (
				<Modal
					onButtonClick={handleModalClose}
					message={modalText}
					buttonText="Volver"
				/>
			)}
		</div>
	);
};

export default App;

/*"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthProvider";
import axios from "axios";
import Modal from "../extras/ModalMensajes";
import "../styles/ruletaStyles.css";

function Ruleta({ idPartida }) {
	const { token, userId } = useAuthContext();
	const router = useRouter();
	const [resultadoRuleta, setResultadoRuleta] = useState(null);
	const wheelRef = useRef(null);
	const [value, setValue] = useState(Math.ceil(Math.random() * 3600));
	const [modalOpen, setModalOpen] = useState(false);
	const [modalText, setModalText] = useState("");

	// Mapeo de los valores de la ruleta y sus posiciones angulares
	const ruletaValues = {
		1: [0, 180], // x1 está en los ángulos 0° y 180°
		2: [45, 225], // x2 está en los ángulos 45° y 225°
		3: [90, 270], // x3 está en los ángulos 90° y 270°
		10: [135, 315], // x10 está en los ángulos 135° y 315°
	};

	const girarRuleta = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/tirar_ruleta",
				{
					token: token,
					userid: userId,
					host: "demo14.emmagini.com",
					lang: lang,
					id: idPartida,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			//console.log(response.data);
			setResultadoRuleta(response.data);

			const premioX = response.data.premio_x;
			const posiblesAngulos = ruletaValues[premioX];
			const anguloSeleccionado =
				posiblesAngulos[Math.floor(Math.random() * posiblesAngulos.length)];

			const spins = Math.ceil(Math.random() * 5) + 3;
			const totalRotation = spins * 360 + anguloSeleccionado;

			if (wheelRef.current) {
				wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
			}

			setTimeout(() => {
				setModalText(response.data.mensaje);
				setModalOpen(true);
			}, 6000);
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
		}
	}, [token, userId, idPartida]);

	const handleSpin = () => {
		if (wheelRef.current) {
			girarRuleta();
		}
	};

	const handleButtonCloseClick = () => {
		router.back();
	};

	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="container relative w-[400px] h-[400px] flex justify-center items-center mb-4">
				<div className="spinBtn" onClick={handleSpin}>
					Girar
				</div>
				<div className="wheel" ref={wheelRef}>
					
					<div className="number" style={{ "--i": 1, "--clr": "#a2cadf" }}>
						<span>x1</span>
					</div>
					
					<div className="number" style={{ "--i": 2, "--clr": "#f7be57" }}>
						<span>x2</span>
					</div>

					<div className="number" style={{ "--i": 3, "--clr": "#4eaf46" }}>
						<span>x3</span>
					</div>

					<div className="number" style={{ "--i": 4, "--clr": "#7568ae" }}>
						<span>x10</span>
					</div>

					<div className="number" style={{ "--i": 5, "--clr": "#a2cadf" }}>
						<span>x1</span>
					</div>

					<div className="number" style={{ "--i": 6, "--clr": "#f7be57" }}>
						<span>x2</span>
					</div>

					<div className="number" style={{ "--i": 7, "--clr": "#4eaf46" }}>
						<span>x3</span>
					</div>

					<div className="number" style={{ "--i": 8, "--clr": "#7568ae" }}>
						<span>x10</span>
					</div>
				</div>
			</div>

			<button
				className="mt-4 px-6 py-2 bg-blueEmmagini text-white rounded"
				onClick={handleButtonCloseClick}
			>
				Cerrar
			</button>

			{modalOpen && (
				<Modal
					onButtonClick={handleButtonCloseClick}
					message={modalText}
					buttonText="Volver"
				/>
			)}
		</div>
	);
}

export default Ruleta; */
