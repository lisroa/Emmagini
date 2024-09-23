// @ts-nocheck

"use client";

import Image from "next/image";
import { useMemo } from "react";
import { RoundButton } from "../../../components/buttons/RoundButton";
import { useJuegoTrucoDataContext } from "@/app/context/truco/JuegoTrucoProvider";
import { BsCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import "@/app/globals.css";

const tiltClasses = [
	"origin-bottom-right -rotate-[10deg]",
	"",
	"origin-bottom-left rotate-[10deg]",
];

function Page() {
	const { infoJuegoTruco, catchActions, catchParam } =
		useJuegoTrucoDataContext();

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	const gameActions = useMemo(() => {
		return (
			infoJuegoTruco?.acciones?.filter(
				(buttonAction) =>
					!(buttonAction.val === "abandono" || buttonAction.val === "irme")
			) || []
		);
	}, [infoJuegoTruco]);

	const leaveActions = useMemo(() => {
		return (
			infoJuegoTruco?.acciones?.filter(
				(buttonAction) =>
					buttonAction.val === "abandono" || buttonAction.val === "irme"
			) || []
		);
	}, [infoJuegoTruco]);
	if (!infoJuegoTruco || !infoJuegoTruco.reverso) return null;

	if (!infoJuegoTruco || !infoJuegoTruco.mesa) return null;

	// Filtra las cartas para las posiciones superiores y las inferiores
	const upperPositions = infoJuegoTruco.mesa.filter(
		(naipe) => naipe.posicion >= 4 && naipe.posicion <= 6
	);
	const lowerPositions = infoJuegoTruco.mesa.filter(
		(naipe) => naipe.posicion >= 1 && naipe.posicion <= 3
	);

	// Ordena las cartas dentro de cada grupo
	upperPositions.sort((a, b) => a.posicion - b.posicion);
	lowerPositions.sort((a, b) => a.posicion - b.posicion);

	return (
		<div className="flex flex-col lg:flex-row gap-5 pt-20 pb-5 w-screen h-screen overflow-hidden p-6">
			<div className="hidden lg:flex lg:flex-col lg:gap-5 lg:w-[200px] xl:w-[300px]">
				{/*
					<div className="hidden lg:flex flex flex-col gap-5 h-[244px]">
					<div className="w-[144px] h-[144px] lg:w-full lg:h-[244px] bg-gray-400 rounded-[20px]" />
				</div>
				*/}

				<div className="flex flex-col gap-5">
					{gameActions &&
						gameActions.map(
							(actionButton) =>
								actionButton.val !== "tirar" && (
									<RoundButton
										key={actionButton.val}
										buttonClassName="bg-blueEmmagini h-[32px] rounded-[11px] w-full py-5 px-10"
										text={actionButton.txt}
										textClassName="text-white"
										onClick={() => catchActions(actionButton.val)}
									/>
								)
						)}
				</div>

				<div className="flex-1 flex flex-col justify-end items-center gap-5">
					{leaveActions &&
						leaveActions.map((actionButton) => (
							<RoundButton
								key={actionButton.val}
								buttonClassName="bg-red h-[32px] rounded-[11px] w-full py-5 px-10"
								text={actionButton.txt}
								textClassName="text-white"
								onClick={() => catchActions(actionButton.val)}
							/>
						))}
				</div>
			</div>

			<div className="flex-1 rounded-[11px] overflow-hidden relative w-full h-full xl:max-w-[1200px] fondo">
				{/*
					<div className="lg:hidden flex flex-row items-center justify-center text-center">
					<div className=" w-[50%] md:w-[144px] h-[144px] bg-gray-400 rounded-[20px]" />
					<div className=" w-[50%] md:w-[144px] h-[144px] bg-gray-400 rounded-[20px] ml-4" />
				</div>
				*/}
				<div className="w-full flex flex-row mb-2">
					<div
						className={`w-[40%] h-[50px] ${
							infoJuegoTruco.miturno ? "border-b-4 border-green-500" : ""
						}`}
					>
						<p className="text-white text-center">Yo:</p>
						<p className="text-white text-center">
							Puntaje: {infoJuegoTruco.puntos_yo}
						</p>
					</div>
					<div className="w-[20%] h-[50px] text-center">
						<p className="text-white">Turno</p>

						<div className="flex flex-row items-center justify-center text-center">
							<BsCaretLeftFill
								className={`w-[20px] h-[20px] text-center ${
									infoJuegoTruco.miturno ? "text-green-500" : "text-gray-500"
								}`}
							/>
							<BsFillCaretRightFill
								className={`w-[20px] h-[20px] ${
									!infoJuegoTruco.miturno ? "text-green-500" : "text-gray-500"
								}`}
							/>
						</div>
					</div>
					<div
						className={`w-[40%] h-[50px] ${
							!infoJuegoTruco.miturno ? "border-b-4 border-green-500" : ""
						}`}
					>
						<p className="text-white text-center">
							{infoJuegoTruco.contrincante}:
						</p>
						<p className="text-white text-center">
							Puntaje: {infoJuegoTruco.puntos_el}
						</p>
					</div>
				</div>
				<div
					className="flex-1 rounded-[11px] overflow-hidden p-5 relative w-full h-[600px] xl:max-w-[1200px] fondo"
					style={{
						backgroundImage: `url(${infoJuegoTruco.tablero})`,
					}}
				>
					<div className="flex flex-col gap-2 flex-1 w-full h-full">
						<div className="w-full flex flex-row justify-center items-center">
							<Image
								src={fixImageUrl(infoJuegoTruco.reverso)}
								width={106}
								height={0}
								className={`w-[54px] h-[72px] md:w-[100px] md:h-[130px] lg:w-[106px] lg:h-[150px] ${tiltClasses[0]}`}
								alt="dorso1"
							/>
							<Image
								src={fixImageUrl(infoJuegoTruco.reverso)}
								width={106}
								height={0}
								className={`w-[54px] h-[72px] md:w-[100px] md:h-[130px] lg:w-[106px] lg:h-[150px] ${tiltClasses[1]}`}
								alt="dorso2"
							/>
							<Image
								src={fixImageUrl(infoJuegoTruco.reverso)}
								width={106}
								height={0}
								className={`w-[54px] h-[72px] md:w-[100px] md:h-[130px] lg:w-[106px] lg:h-[150px] ${tiltClasses[2]}`}
								alt="dorso3"
							/>
						</div>

						<div className="flex-1 flex flex-col justify-center items-center gap-5">
							<div className="flex justify-center gap-5 mb-5">
								{upperPositions.map((naipe) => (
									<Image
										key={naipe.id_naipe}
										src={fixImageUrl(naipe.imagen)}
										width={106}
										height={208}
										alt={`naipe ${naipe.numero} de ${naipe.palo}`}
										className="w-[83px] h-[101px]"
									/>
								))}
							</div>
							<div className="flex justify-center gap-5">
								{lowerPositions.map((naipe) => (
									<Image
										key={naipe.id_naipe}
										src={fixImageUrl(naipe.imagen)}
										width={106}
										height={208}
										alt={`naipe ${naipe.numero} de ${naipe.palo}`}
										className="w-[83px] h-[101px]"
									/>
								))}
							</div>
						</div>

						<div className="w-full flex flex-row justify-center items-center mb-16">
							{infoJuegoTruco &&
								infoJuegoTruco.mis_cartas &&
								infoJuegoTruco.mis_cartas.map((naipe, i) => (
									<button
										onClick={() => catchParam("tirar", naipe.id_naipe)}
										key={naipe.id}
									>
										<Image
											src={fixImageUrl(naipe.imagen)}
											width={106}
											height={208}
											className={`w-[54px] h-[72px] md:w-[100px] md:h-[130px] lg:w-[106px] lg:h-[150px] ${tiltClasses[i]}`}
											alt="naipe"
											key={naipe.id}
										/>
									</button>
								))}
						</div>
					</div>
				</div>
			</div>

			<div className="w-full lg:w-[200px] xl:w-[300px] lg:col-span-3 flex flex-col gap-5">
				{/*
					<div className="hidden lg:flex flex-col gap-5 h-[244px]">
					<div className=" w-[144px] h-[144px] lg:w-full lg:h-[244px] bg-gray-400 rounded-[20px]" />
				</div>
				*/}
				<div className="h-[39px] lg:w-full lg:min-h-[420px] lg:max-h-full flex flex-col items-center justify-center bg-zinc-300 rounded-[20px] p-2">
					{infoJuegoTruco && infoJuegoTruco.chat && (
						<>
							<div className="lg:hidden">
								{(() => {
									const lastMessage = infoJuegoTruco.chat
										.filter((text) => text.jugador !== "system")
										.pop();

									if (!lastMessage) return null;

									const messageClass =
										lastMessage.jugador === "Yo"
											? "text-white font-normal"
											: "text-white font-bold";

									return (
										<p
											key={lastMessage.id}
											className={`text-base ${messageClass}`}
										>
											{lastMessage.jugador === "Yo"
												? "Yo: "
												: `${lastMessage.jugador}: `}
											{lastMessage.mensaje}
										</p>
									);
								})()}
							</div>

							<div className="hidden lg:block">
								{infoJuegoTruco.chat.map((text) => {
									if (text.jugador === "system") {
										return null;
									}

									const messageClass =
										text.jugador === "Yo"
											? "text-white font-normal"
											: "text-white font-bold";

									return (
										<p key={text.id} className={`text-base ${messageClass}`}>
											{text.jugador === "Yo" ? "Yo: " : `${text.jugador}: `}
											{text.mensaje}
										</p>
									);
								})}
							</div>
						</>
					)}
				</div>
			</div>

			<div className="lg:hidden w-full grid grid-cols-3 gap-2 min-h-[39px]">
				{gameActions.map(
					(actionButton) =>
						actionButton.val !== "tirar" && (
							<RoundButton
								key={actionButton.val}
								buttonClassName="bg-blueEmmagini h-[36px] rounded-[11px] w-full py-5 px-10"
								text={actionButton.txt}
								textClassName="text-white text-xs"
								onClick={() => catchActions(actionButton.val)}
							/>
						)
				)}

				{leaveActions.map((actionButton) => (
					<RoundButton
						buttonClassName="bg-red h-[36px] rounded-[11px] w-full py-5 px-10"
						text={actionButton.txt}
						textClassName="text-white text-xs"
						onClick={() => catchActions(actionButton.val)}
						key={actionButton.val}
					/>
				))}
			</div>
		</div>
	);
}

export default Page;
