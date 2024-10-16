// TO-DO: Armar funcion que haga la pegada para traer los sorteos y armar pages de los sorteos.
// TO-DO: Agregar el truco a la demo25 para que venga todo en contenidos.

"use client";
import { useRouter } from "next/navigation";
import CardHome from "../cards/CardHome";
import CardTruco from "@/app/components/cards/CardTruco";
import { useDataContext } from "../../context/GameDataProvider";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import { useDataAlbumContext } from "@/app/context/trivia/AlbumProvider";
import WhileTap from "@/app/components/animations/WhileTap";

function Table() {
	const { infoGames, infoTruco, empresa, textos, data } = useDataContext();
	const { setIdTorneo } = useSeriesTrucoDataContext();
	const { idAlbum, setIdAlbum } = useDataAlbumContext();
	const router = useRouter();

	console.log("infoGames", infoGames);
	console.log("Data", data);

	const saveTournamentIdToCache = (tournamentId) => {
		localStorage.setItem("tournamentId", tournamentId);
	};

	const handleTournamentCardClick = (tournamentId) => {
		setIdTorneo(tournamentId);
		saveTournamentIdToCache(tournamentId);
	};

	const handleCardClick = (id, tipo, nombre) => {
		if (tipo === "museo") {
			router.push(`/app/museo/${id}`);
		} else if (tipo === "album") {
			if (nombre === "Trivia Copa") {
				router.push(`/app/trivia/${id}`);
				setIdAlbum(id);
			} else if (nombre === "Stickers tester") {
				router.push(`/app/stickers/${id}`);
			} else {
				router.push(`/app/stickers/${id}`);
			}
		} else if (tipo === "parejas") {
			router.push(`/app/parejas/${id}`);
		} else if (tipo === "memotest") {
			if (nombre === "Desafio Naldo") {
				router.push(`/app/memotest/${id}`);
			} else if (nombre === "desafio Chevrolet") {
				router.push(`/app/memotest/${id}`);
			} else if (nombre === "Desafio Rapicuotas") {
				router.push(`/app/memotest/${id}`);
			} else {
				router.push(`/app/memotest/${id}`);
			}
		} else if (tipo === "lineatiempo") {
			router.push(`/app/lineatiempo/${id}`);
		} else if (tipo === "torneotruco") {
			router.push(`/app/truco`);
		} else {
			("");
		}
	};
	function fixImageUrl(url) {
		if (url && url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}
	/*console.log("infoTruco", infoTruco);*/

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 pb-[110px]">
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{empresa && empresa.mostrar_sorteos === 1 && (
					<WhileTap>
						<div className="flex justify-center">
							<CardHome
								text={textos.titulo_sorteos}
								imageCard={fixImageUrl(empresa.imagen_sorteos)}
								onClick={() => handleCardClick(game.id, game.tipo, game.titulo)}
							/>
						</div>
					</WhileTap>
				)}
				{infoGames &&
					Object.values(infoGames)
						.sort((a, b) => a.orden - b.orden)
						.map((game) => (
							<WhileTap key={game.id}>
								<div className="flex justify-center" key={game.id}>
									<CardHome
										text={game.titulo}
										imageCard={
											game.image ||
											game.imagen ||
											game.imagen_1 ||
											game.imagen_0
										}
										onClick={() =>
											handleCardClick(game.id, game.tipo, game.titulo)
										}
									/>
								</div>
							</WhileTap>
						))}
				{infoTruco &&
					Object.values(infoTruco)
						.sort((a, b) => a.orden - b.orden)
						.map((torneo) => (
							<WhileTap key={torneo.id}>
								<div className="flex justify-center" key={torneo.id}>
									<CardHome
										onClick={() => {
											handleTournamentCardClick(torneo.id);
											handleCardClick(torneo.id, torneo.tipo, torneo.titulo);
										}}
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
