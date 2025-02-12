"use client";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import RoundButton from "@/app/components/buttons/RoundButton";
import DivRounded from "@/app/components/extras/DivRounded";
import GamesCounter from "@/app/components/extras/GamesCounter";
import PrizesCard from "@/app/components/cards/PrizesCard";
import CardGames from "@/app/components/cards/CardGames";
import { useJuegoTrucoDataContext } from "@/app/context/truco/JuegoTrucoProvider";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import { usePartidasTrucoDataContext } from "@/app/context/truco/PartidasTrucoProvider";
import CardNewGame from "@/app/components/cards/CardNewGame";
import tester from "@/public/assets/cards/imageCard.png";

function Page() {
	const savePartidaIdToCache = (partidoId) => {
		localStorage.setItem("partidoId", partidoId);
	};

	const handlePartidaClick = (partidoId) => {
		setIdPartidaElegida(partidoId);
		savePartidaIdToCache(partidoId);
	};

	const { infoSeriesTruco, getSeriesData } = useSeriesTrucoDataContext();
	const { setIdPartidaElegida, getJuegoData } = useJuegoTrucoDataContext();
	const { crearPartida, eliminarPartida, unirmeAPartida } =
		usePartidasTrucoDataContext();

	const handleClickCrearPartida = useCallback(async () => {
		try {
			await crearPartida();
		} catch (error) {
			console.error("Error al crear la partida:", error);
		}
	}, [crearPartida]);

	useEffect(() => {
		getSeriesData();
	}, [getSeriesData]);

	const handleClickEliminarPartida = useCallback(
		async (id) => {
			try {
				await eliminarPartida(id);
			} catch (error) {
				console.error("Error al eliminar la partida:", error);
			}
		},
		[eliminarPartida]
	);

	useEffect(() => {
		getSeriesData();
	}, [getSeriesData]);

	const handleClickUnirmeAPartida = useCallback(
		async (id) => {
			try {
				await unirmeAPartida(id);
			} catch (error) {
				console.error("Error al unirte a la partida:", error);
			}
		},
		[unirmeAPartida]
	);

	useEffect(() => {
		getJuegoData();
	}, [getJuegoData]);

	return (
		<div className="">
			<div>
				<h1 className="mt-20 text-white text-center font-bold text-2xl">
					Nombre del torneo
				</h1>
				<div className="w-[350px] lg:w-[650px] mx-auto">
					<h2 className="sm:mt-2 md:mt-2 lg:mt-4 font-medium text-xs lg:text-sm text-white text-center">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
						maiores dolore!
					</h2>
					<Link href="/#">
						<p className="text-blueEmmagini font-medium text-center text-xs lg:text-sm mt-2">
							Terminos y condiciones
						</p>
					</Link>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-8 mt-2">
				<div className="flex flex-col">
					<div className="w-[209px] h-[36pxpx] mx-auto">
						<RoundButton
							buttonClassName="bg-blueEmmagini h-[36px] mt-2 py-5 px-10"
							text="Crear partida"
							textClassName="text-white"
							onClick={handleClickCrearPartida}
						/>
					</div>

					<p className="text-[10px] md:text-xs lg:text-base text-center text-white mt-2">
						Fin de la fase: 27/04/2024
					</p>
					<div className="w-[339px] h-32 lg:h-[180px] mx-auto mt-2">
						<p className="text-center text-blueEmmagini text-base font-medium md:text-lg lg:text-2xl">
							Tu ranking
						</p>
						<p className="text-center text-blueEmmagini font-bold text-2xl md:text-3xl lg:text-3xl">
							83,3%
						</p>
						<p className="text-[14px] md:text-xs lg:text-base text-center text-white">
							Ultimos 10 partidos
						</p>
						<GamesCounter />
						<div className="w-[337px] h-8 lg:w-[360px] lg:h-10 mt-4">
							<p className="text-[12px] lg:text-[15px] md:text-xs font-normal text-white text-center">
								Completá 10 partidos para validar tu participación. <br /> El
								10% con mejor ranking pasa a la siguiente fase.
							</p>
						</div>
						<div className="flex flex-wrap gap-4 justify-center items-center w-[337px] h-14 mt-2">
							<div className="flex flex-col justify-center items-center">
								<p className="text-blueEmmagini text-base">Participantes</p>
								<DivRounded divClassName="w-[160.4px] h-7" text="3522" />
							</div>
							<div className="flex flex-col justify-center items-center">
								<p className="text-blueEmmagini text-base">Tu posición</p>
								<DivRounded divClassName="w-[160.4px] h-7" text="176" />
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-center mt-20 lg:mt-2">
					<div className="w-[336.91] h-[366]">
						<h2 className="text-white ml-6 mb-2 text-xs lg:text-base font-semibold sm:mt-4 xl:mt-0">
							Premios
						</h2>
						<div className="w-[336px] h-[99px] mt-4 drop-shadow-lg">
							<PrizesCard
								title="Primer premio"
								imageClassName="rounded-lg"
								description="descripcion del premio Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequuntur totam iusto modi cumque tempora earum eum, hic tenetur,"
							/>
						</div>
						<div className="w-[336px] h-[99px] mt-4">
							<PrizesCard
								cardClassName="w-[336px] h-[99px] mt-4 drop-shadow-lg"
								title="Segundo premio"
								imageClassName="rounded-lg"
								description="descripcion del premio Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequuntur totam iusto modi cumque tempora earum eum, hic tenetur, "
							/>
						</div>
						<div className="w-[336px] h-[99px] mt-4">
							<PrizesCard
								cardClassName="w-[336px] h-[99px] mt-4 drop-shadow-lg"
								title="Tercer premio"
								imageClassName="rounded-lg"
								description="descripcion del premio Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequuntur totam iusto modi cumque tempora earum eum, hic tenetur,"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto py-8 px-4 lg:px-8">
				{/* Mis partidas creadas */}
				{infoSeriesTruco?.esperando?.length > 0 && (
					<section className="mb-12">
						<h2 className="text-white text-lg font-semibold mb-4">
							Mis partidas creadas
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-4 gap-6">
							{infoSeriesTruco.esperando.map((partido) => (
								<CardNewGame
									key={partido.id}
									image={tester}
									alt="Partida creada"
									title={partido.nombre_1}
									description={partido.nombre_2}
									buttonText="Eliminar"
									buttonClassName="bg-red w-full h-[36px] text-white"
									onClick={() => handleClickEliminarPartida(partido.id)}
								/>
							))}
						</div>
					</section>
				)}

				{/* Partidas activas */}
				{infoSeriesTruco?.actuales?.length > 0 && (
					<section className="mb-12">
						<h2 className="text-white text-lg font-semibold mb-4">Activos</h2>
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-4 gap-6">
							{infoSeriesTruco.actuales.map((partido) => (
								<CardGames
									key={partido.id}
									cardClassName="drop-shadow-lg"
									image={tester}
									imageClassName="w-[91px] h-[155px]"
									link="/app/truco/partido"
									title={`Oponente: ${partido.nombre_1}`}
									description={`Puntaje:`}
									button={true}
									buttonText="Entrar"
									buttonClassName="bg-blueEmmagini w-[160px] h-[36px] text-white"
									onClick={() => handlePartidaClick(partido.id)}
								/>
							))}
						</div>
					</section>
				)}

				{/* Partidas abiertas */}
				{infoSeriesTruco?.abiertos?.length > 0 && (
					<section className="mb-12">
						<h2 className="text-white text-lg font-semibold mb-4">
							Partidos disponibles
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-4 gap-6">
							{infoSeriesTruco.abiertos.map((partido) => (
								<CardGames
									key={partido.id}
									cardClassName="drop-shadow-lg"
									image={tester}
									imageClassName="w-[91px] h-[155px]"
									link="/app/truco/partido"
									title={`Oponente: ${partido.nombre_1}`}
									button={true}
									buttonText="Unirme"
									buttonClassName="bg-blueEmmagini w-[160px] h-[36px] text-white"
									onClick={() => handleClickUnirmeAPartida(partido.id)}
								/>
							))}
						</div>
					</section>
				)}

				{/* Partidas terminadas */}
				{infoSeriesTruco?.terminados?.length > 0 && (
					<section className="mb-12">
						<h2 className="text-white text-lg font-semibold mb-4">
							Terminados
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-4 gap-6">
							{infoSeriesTruco.terminados.map((partido) => (
								<CardGames
									key={partido.id}
									cardClassName="drop-shadow-lg"
									image={tester}
									imageClassName="w-[91px] h-[155px]"
									link="/#"
									title={`Oponente: ${partido.nombre_2}`}
									description="Puntaje:"
									div
									divText={partido.ganaste ? "Ganaste" : "Perdiste"}
									divClassName={`w-full h-[36px] text-white ${
										partido.ganaste ? "bg-green-500" : "bg-red-500"
									}`}
								/>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

export default Page;

/*

{infoSeriesTruco &&
				infoSeriesTruco.esperando &&
				infoSeriesTruco.esperando.length > 0 && (
					<div className="w-[36px] lg:w-[1300px] h-auto lg:ml-24 mt-20">
						<h2 className="text-white text-xs font-semibold ml-6">
							Mis partidas creadas
						</h2>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-20 mt-8">
							<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{infoSeriesTruco.esperando.map((partido) => (
									<div key={partido.id} className="flex justify-center">
										<CardNewGame
											image={tester}
											alt="Partida creada"
											title={partido.nombre_1}
											description={partido.nombre_2}
											buttonText="Eliminar"
											buttonClassName="bg-blueEmmagini w-[160px] h-[36px] bg-red text-white"
											onClick={() => {
												handleClickEliminarPartida(partido.id);
											}}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

			{infoSeriesTruco &&
				infoSeriesTruco.actuales &&
				infoSeriesTruco.actuales.length > 0 && (
					<div className="w-[306px] lg:w-[1300px] mt-8 h-auto lg:ml-24 lg:mt-14 bg-green-500">
						<h2 className="text-white text-xs font-semibold ml-6">Activos</h2>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-20 mt-6">
							<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
								{infoSeriesTruco &&
									infoSeriesTruco.actuales &&
									infoSeriesTruco.actuales.map((partido) => (
										<div
											key={partido.id}
											className="flex justify-center w-[306px] h-[214px]"
										>
											<CardGames
												cardClassName="drop-shadow-lg"
												image={tester}
												imageClassName="w-[91px] h-[155px]"
												link="/app/truco/partido"
												title={`Oponente: ${partido.nombre_1}`}
												description={`Puntaje:`}
												button={true}
												buttonText="Entrar"
												buttonClassName="bg-blueEmmagini w-[160px] h-[36px] text-white"
												onClick={() => handlePartidaClick(partido.id)}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
				)}

			{infoSeriesTruco &&
				infoSeriesTruco.abiertos &&
				infoSeriesTruco.abiertos.length > 0 && (
					<div className="w-[336px] lg:w-[1300px] h-auto lg:ml-24 lg:mt-20">
						<h2 className="text-white text-xs font-semibold ml-6">
							Partidos disponibles
						</h2>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
							<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{infoSeriesTruco &&
									infoSeriesTruco.abiertos &&
									infoSeriesTruco.abiertos.map((partido) => (
										<div
											key={partido.id}
											className="flex justify-center w-[306px]"
										>
											<CardGames
												cardClassName="drop-shadow-lg"
												image={tester}
												imageClassName="w-[91px] h-[155px]"
												link="/app/truco/partido"
												title={`Oponente: ${partido.nombre_1}`}
												button={true}
												buttonText="Unirme"
												buttonClassName="bg-blueEmmagini w-[160px] h-[36px] text-white"
												onClick={() => handleClickUnirmeAPartida(partido.id)}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
				)}

			{infoSeriesTruco &&
				infoSeriesTruco.terminados &&
				infoSeriesTruco.terminados.length > 0 && (
					<div className="w-[336px] lg:w-[1300px] h-auto lg:mt-14 lg:ml-20">
						<h2 className="text-white text-xs font-semibold ml-6">
							Terminados
						</h2>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
							<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{infoSeriesTruco &&
									infoSeriesTruco.terminados &&
									infoSeriesTruco.terminados.map((partido) => (
										<div
											key={partido.id}
											className="flex justify-center w-[306px]"
										>
											<CardGames
												cardClassName="drop-shadow-lg"
												image={tester}
												imageClassName="w-[91px] h-[155px]"
												link="/#"
												title={`Oponente: ${partido.nombre_2}`}
												description={`Puntaje:`}
												div={true}
												divText={
													partido.ganaste == false ? "Perdiste" : "Ganaste"
												}
												divClassName={
													partido.ganaste == false
														? "bg-red w-[160px] h-[36px] text-white"
														: "bg-green-600 w-[160px] h-[36px] text-white"
												}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
				)}


				*/
