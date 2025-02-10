"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import MemoBlock from "../MemoBlock/MemoBlock";
import RoundButton from "@/app/components/buttons/RoundButton";
import { useRouter } from "next/navigation";

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

const fetchGetGame = async (token: string, userId: string, idJuego: string) => {
	console.log("Ejecutando fetchGetGame con action: get");
	const response = await axios.post(
		"https://backend.emmagini.com/api2/mom_jugar",
		{
			id: idJuego,
			action: "get",
			host: "demo14.emmagini.com",
			callback: `https://demo14.emmagini.com/home.php#v=mom&id=${idJuego}`,
			token,
			userid: userId,
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

const fetchStartGame = async (
	token: string,
	userId: string,
	idJuego: string
) => {
	console.log("Ejecutando fetchStartGame con action: start");
	const response = await axios.post(
		"https://backend.emmagini.com/api2/mom_jugar",
		{
			id: idJuego,
			action: "start",
			host: "demo14.emmagini.com",
			callback: `https://demo14.emmagini.com/home.php#v=mom&id=${idJuego}`,
			token,
			userid: userId,
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

const fetchActionGame = async (
	token: string,
	userId: string,
	idJuego: string,
	action: string
) => {
	console.log(`Ejecutando fetchActionGame con action: ${action}`);
	const response = await axios.post(
		"https://backend.emmagini.com/api2/mom_jugar",
		{
			id: idJuego,
			action,
			host: "demo14.emmagini.com",
			callback: `https://demo14.emmagini.com/home.php#v=mom&id=${idJuego}`,
			token,
			userid: userId,
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

function Page({ params: { idJuego } }: ComponentProps) {
	const { infoGames, empresa } = useDataContext();
	const { token, userId } = useAuthContext();
	const router = useRouter();
	const [startGameData, setStartGameData] = useState<any>(null);
	const [actionGameData, setActionGameData] = useState<any>(null);
	const [shouldFlip, setShouldFlip] = useState(false);
	const [resultImage, setResultImage] = useState<string | null>(null);
	const [mayorText, setMayorText] = useState("Mayor");
	const [menorText, setMenorText] = useState("Menor");
	const [mayorBgColor, setMayorBgColor] = useState("bg-blueEmmagini");

	const [onClickMayor, setOnClickMayor] = useState<() => void>(
		() => () => handleActionClick("mayor")
	);
	const [onClickMenor, setOnClickMenor] = useState<() => void>(
		() => () => handleActionClick("menor")
	);

	const [gameKey, setGameKey] = useState(0);

	const [firstMemoFlipped, setFirstMemoFlipped] = useState(false);

	useQuery(
		["startGameData", token, userId, idJuego],
		async () => {
			const getData = await fetchGetGame(token, userId, idJuego);
			if (getData?.id === null && getData?.error === 0) {
				console.log("Respuesta de get:", getData, "-> se ejecuta start");
				return await fetchStartGame(token, userId, idJuego);
			}
			return getData;
		},
		{
			onSuccess: (data) => {
				console.log("Datos iniciales del juego cargados:", data);
				setStartGameData(data);
			},

			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
		}
	);

	useEffect(() => {
		if (startGameData) {
			setFirstMemoFlipped(false);
			const timer = setTimeout(() => {
				setFirstMemoFlipped(true);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [startGameData]);

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

	const handleActionClick = async (newAction: string) => {
		console.log("Botón clickeado con acción:", newAction);
		try {
			setShouldFlip(false);
			const data = await fetchActionGame(token, userId, idJuego, newAction);
			setTimeout(() => {
				setActionGameData(data);
				setShouldFlip(true);
				setMayorBgColor("bg-[#ea9a45]");

				if (data?.win !== undefined) {
					const currentJuego = infoGames.find(
						(juegoItem: any) => juegoItem.id === idJuego
					);
					setResultImage(
						data.win ? currentJuego.imagen_ok : currentJuego.imagen_fail
					);

					if (data.win) {
						console.log("Resultado de la acción: ¡Ganaste!");
						setMayorText("Cobrar y salir");
						setMenorText("Continuar");
						setOnClickMayor(() => () => handleCobrar());
						setOnClickMenor(() => () => resetGame());
					} else {
						console.log("Resultado de la acción: Fallaste");
						setMayorText("Salir");
						setMenorText("Volver a jugar");
						setOnClickMayor(() => () => router.push("/app"));
						setOnClickMenor(() => () => resetGame());
					}
				}
			}, 300);
		} catch (error) {
			console.error("Error en handleActionClick:", error);
		}
	};

	const handleCobrar = async () => {
		console.log("Acción Cobrar iniciada");
		try {
			await fetchActionGame(token, userId, idJuego, "cobrar");
		} catch (error) {
			console.error("Error en handleCobrar:", error);
		}
		setTimeout(() => {
			router.push("/app");
		}, 300);
	};

	const resetGame = async () => {
		console.log("Reiniciando el juego...");
		try {
			setFirstMemoFlipped(false);
			setShouldFlip(false);
			setActionGameData(null);
			setResultImage(null);
			setMayorText("Mayor");
			setMenorText("Menor");
			setMayorBgColor("bg-blueEmmagini");

			const data = await fetchGetGame(token, userId, idJuego);
			if (data?.id === null && data?.error === 0) {
				console.log("Reset: respuesta de get:", data, "-> se ejecuta start");
				const startData = await fetchStartGame(token, userId, idJuego);
				setStartGameData(startData);
			} else {
				setStartGameData(data);
			}
			setOnClickMayor(() => () => handleActionClick("mayor"));
			setOnClickMenor(() => () => handleActionClick("menor"));
			setGameKey((prev) => prev + 1);
		} catch (error) {
			console.error("Error en resetGame:", error);
		}
	};

	if (!infoGames || !startGameData) {
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

	const juego = infoGames.find((juegoItem: any) => juegoItem.id === idJuego);

	return (
		<div className="mt-20 flex flex-col items-center gap-8">
			<h1 className="text-white text-center text-xl font-medium">
				{juego.nombre}
			</h1>
			<div className="flex justify-center gap-4">
				<p className="text-center text-white text-base font-extrabold">
					Pozo: {juego.precio}
				</p>
				<p className="text-center text-white text-base font-extrabold">
					Ronda: {startGameData?.ronda || 0} / {juego.rondas}
				</p>
			</div>
			<div className="flex justify-center gap-6">
				<div className="w-[220px] h-[165px]">
					<MemoBlock
						key={`card-${gameKey}`}
						memoBlock={{ img: startGameData?.img_carta }}
						cover={juego.reverso}
						autoFlip={firstMemoFlipped}
						width={220}
						height={165}
					/>
				</div>

				<div className="w-[220px] h-[165px]">
					<MemoBlock
						key={`action-${gameKey}`}
						memoBlock={{ img: actionGameData?.img_carta }}
						cover={juego.reverso}
						autoFlip={shouldFlip}
						width={220}
						height={165}
					/>
				</div>
			</div>
			<div className="w-[200px] flex flex-col gap-2">
				<RoundButton
					text={mayorText}
					buttonClassName={`w-full h-full ${mayorBgColor} text-white`}
					onClick={onClickMayor}
				/>
				<RoundButton
					text={menorText}
					buttonClassName="w-full h-full bg-blueEmmagini text-white"
					onClick={onClickMenor}
				/>
			</div>
			<div className="rounded-lg w-[480px] h-[360px]">
				<MemoBlock
					key={`banner-${gameKey}`}
					memoBlock={{ img: resultImage }}
					cover={juego.banner}
					autoFlip={shouldFlip}
					width={480}
					height={360}
				/>
			</div>
		</div>
	);
}

export default Page;
