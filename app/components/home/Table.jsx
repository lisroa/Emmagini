/*"use client";
import { useRouter } from "next/navigation";
import CardHome from "../cards/CardHome";
import CardTruco from "@/app/components/cards/CardTruco";
import { useDataContext } from "../../context/GameDataProvider";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import { useDataAlbumContext } from "@/app/context/trivia/AlbumProvider";
import WhileTap from "@/app/components/animations/WhileTap";

function Table() {
	const { infoGames, infoTruco } = useDataContext();
	const { setIdTorneo } = useSeriesTrucoDataContext();
	const { idAlbum, setIdAlbum } = useDataAlbumContext();
	const router = useRouter();

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
			} else if (nombre === "stickers") {
				router.push(`/app/stickers/${id}`);
			} else {
				router.push(`/app/album/${id}`);
			}
		} else if (tipo === "parejas") {
			if (nombre === "specificName1") {
				router.push(`/app/parejas/specificPath1/${id}`);
			} else if (nombre === "specificName2") {
				router.push(`/app/parejas/specificPath2/${id}`);
			} else {
				router.push(`/app/parejas/${id}`);
			}
		} else if (tipo === "memotest") {
			if (nombre === "specificName1") {
				router.push(`/app/memotest/specificPath1/${id}`);
			} else if (nombre === "specificName2") {
				router.push(`/app/memotest/specificPath2/${id}`);
			} else {
				router.push(`/app/memotest/${id}`);
			}
		} else if (tipo === "lineatiempo") {
			if (nombre === "specificName1") {
				router.push(`/app/lineatiempo/specificPath1/${id}`);
			} else if (nombre === "specificName2") {
				router.push(`/app/lineatiempo/specificPath2/${id}`);
			} else {
				router.push(`/app/lineatiempo/${id}`);
			}
		} else {
			("");
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
									onClick={() =>
										handleCardClick(game.id, game.tipo, game.titulo)
									}
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
										handleCardClick(torneo.id, torneo.tipo, torneo.titulo)
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

export default Table; */

"use client";
import { useRouter } from "next/navigation";
import CardHome from "../cards/CardHome";
import CardTruco from "@/app/components/cards/CardTruco";
import { useDataContext } from "../../context/GameDataProvider";
import { useSeriesTrucoDataContext } from "@/app/context/truco/SeriesTrucoProvider";
import { useDataAlbumContext } from "@/app/context/trivia/AlbumProvider";
import WhileTap from "@/app/components/animations/WhileTap";

function Table() {
	const { infoGames, infoTruco, empresa, textos } = useDataContext();
	const { setIdTorneo } = useSeriesTrucoDataContext();
	const { idAlbum, setIdAlbum } = useDataAlbumContext();
	const router = useRouter();

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
			} else if (nombre === "stickers") {
				router.push(`/app/stickers/${id}`);
			} else {
				router.push(`/app/album/${id}`);
			}
		} else if (tipo === "parejas") {
			if (nombre === "specificName1") {
				router.push(`/app/parejas/specificPath1/${id}`);
			} else if (nombre === "specificName2") {
				router.push(`/app/parejas/specificPath2/${id}`);
			} else {
				router.push(`/app/parejas/${id}`);
			}
		} else if (tipo === "memotest") {
			if (nombre === "specificName1") {
				router.push(`/app/memotest/specificPath1/${id}`);
			} else if (nombre === "specificName2") {
				router.push(`/app/memotest/specificPath2/${id}`);
			} else {
				router.push(`/app/memotest/${id}`);
			}
		} else if (tipo === "lineatiempo") {
			if (nombre === "specificName1") {
				router.push(`/app/lineatiempo/specificPath1/${id}`);
			} else if (nombre === "specificName2") {
				router.push(`/app/lineatiempo/specificPath2/${id}`);
			} else {
				router.push(`/app/lineatiempo/${id}`);
			}
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

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 pb-[110px]">
			<div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
									<CardTruco
										href="/app/truco"
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
