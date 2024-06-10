"use client";
import { useRouter } from "next/navigation";
import CardHome from "../cards/CardHome";
import CardTruco from "@/app/components/cards/CardTruco";
import { useDataContext } from "../../context/GameDataProvider";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import WhileTap from "@/app/components/animations/WhileTap";

function Table() {
	const { infoGames, infoTruco } = useDataContext();
	const { setIdTorneo } = useSeriesTrucoDataContext();
	const router = useRouter();

	const saveTournamentIdToCache = (tournamentId) => {
		localStorage.setItem("tournamentId", tournamentId);
	};

	const handleTournamentCardClick = (tournamentId) => {
		setIdTorneo(tournamentId);
		saveTournamentIdToCache(tournamentId);
	};

	const handleCardClick = (id, tipo) => {
		// Redirect based on type
		if (tipo === "museo") {
			router.push(`/app/museo/${id}`);
		} else if (tipo === "album") {
			// Example path for category
			router.push(`/app/album/${id}`);
		} else if (tipo === "parejas") {
			// Example path for product
			router.push(`/app/parejas/${id}`);
		} else {
			// Default path or handle other types
			router.push(`/app/`);
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 pb-[110px]">
			<div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{infoGames &&
					Object.values(infoGames).map((game) => (
						<WhileTap key={game.id}>
							<div className="flex justify-center" key={game.id}>
								<CardHome
									text={game.titulo}
									imageCard={
										game.image || game.imagen || game.imagen_1 || game.imagen_0
									}
									onClick={() => handleCardClick(game.id, game.tipo)}
								/>
							</div>
						</WhileTap>
					))}
				{infoTruco &&
					Object.values(infoTruco).map((torneo) => (
						<WhileTap key={torneo.id}>
							<div className="flex justify-center" key={torneo.id}>
								<CardTruco
									href="/app/truco"
									onClick={() => (
										handleTournamentCardClick(torneo.id),
										handleCardClick(torneo.id, torneo.tipo)
									)}
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
