"use client";
import CardGames from "../../components/cards/CardGames";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";

// TODO: Hay que agregar logica que ordene los torneos por activos, proximos o anteriores segun la fecha o algun parametro que venga por API.
// TODO: Agregar los textos desde el back.

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
			<h1 className="text-white text-center mt-20 text-2xl font-bold">
				Torneos de truco
			</h1>
			<div className="container mx-auto px-4 mb-32 mt-8">
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
					{infoTorneosTruco &&
						infoTorneosTruco.series &&
						infoTorneosTruco.series.map((serie) => (
							<div key={serie.id} className="flex justify-center">
								<CardGames
									cardClassName="w-full h-[185px] drop-shadow-lg"
									link="/app/truco/partidas-disponibles"
									image={serie.imagen}
									imageClassName="w-[100px] h-[155px]"
									alt="serie.nombre"
									title={serie.nombre}
									description="Descripcion"
									button={true}
									buttonText="ingresar"
									textSpan={`Fecha de fin: ${serie.fin_txt}`}
									textSpanClassName="text-xs"
									buttonClassName="bg-blueEmmagini w-full h-[36.37px] text-white"
									onClick={() => handleSerieClick(serie.id)}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	);
}
