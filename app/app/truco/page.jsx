"use client";
import CardGames from "../../components/cards/CardGames";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";

// TODO: Hay que agregar logica que ordene los torneos por activos, proximos o anteriores segun la fecha o algun parametro que venga por API.

export default function Page() {
	const { infoTorneosTruco, setIdSerie } = useSeriesTrucoDataContext();

	const saveSerieIdToCache = (serieId) => {
		localStorage.setItem("serieId", serieId);
	};

	const handleSerieClick = (serieId) => {
		setIdSerie(serieId);
		saveSerieIdToCache(serieId);
	};

	return (
		<>
			<h1 className="text-black text-center mt-20 text-2xl font-bold">
				Torneos de truco
			</h1>
			<div className="container mx-auto px-4 mb-32 mt-8">
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
					{infoTorneosTruco &&
						infoTorneosTruco.series &&
						infoTorneosTruco.series.map((serie) => (
							<div key={serie.id} className="flex justify-center">
								<CardGames
									link="/app/truco/partidas-disponibles"
									image={serie.imagen}
									cardClassName="w-[300px] h-[185px] drop-shadow-lg"
									alt="serie.nombre"
									title={serie.nombre}
									description={serie.inicio_txt}
									button={true}
									buttonText="ingresar"
									textSpan={serie.fin_txt}
									buttonClassName="bg-blueEmmagini w-[160px] h-[36.37px]"
									onClick={() => handleSerieClick(serie.id)}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	);
}
