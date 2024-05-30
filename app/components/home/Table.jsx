"use client";
import CardHome from "../cards/CardHome";
import { useDataContext } from "../../context/GameDataProvider";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import WhileTap from "@/app/components/animations/WhileTap";

function Table() {
	const { infoGames, infoTruco } = useDataContext();
	const { setIdTorneo } = useSeriesTrucoDataContext();

	const saveTournamentIdToCache = (tournamentId) => {
		localStorage.setItem("tournamentId", tournamentId);
	};

	const handleTournamentCardClick = (tournamentId) => {
		setIdTorneo(tournamentId);
		saveTournamentIdToCache(tournamentId);
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32">
			<div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{infoGames &&
					Object.values(infoGames).map((game) => (
						<WhileTap key={game.id}>
							<div className="flex justify-center">
								<CardHome
									href="/#"
									text={game.titulo}
									imageCard={
										game.image || game.imagen || game.imagen_1 || game.imagen_0
									}
								/>
							</div>
						</WhileTap>
					))}
				{infoTruco &&
					Object.values(infoTruco).map((torneo) => (
						<WhileTap key={torneo.id}>
							<div className="flex justify-center">
								<CardHome
									href="/app/truco"
									onClick={() => handleTournamentCardClick(torneo.id)}
									text={torneo.titulo}
									imageCard={
										torneo.image ||
										torneo.imagen ||
										torneo.imagen_1 ||
										torneo.imagen_0
									}
								/>
							</div>
						</WhileTap>
					))}
			</div>
		</div>
	);
}

export default Table;
