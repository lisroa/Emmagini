"use client";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import CardGames from "@/app/components/cards/CardGames";
import "../../components/styles/loader.css";

const fetchAuctions = async (token: any, userId: any) => {
	const response = await axios.post(
		"https://backend.emmagini.com/api2/get_auctions",
		{
			token,
			userid: userId,
			host: "demo25.emmagini.com",
			id_club: null,
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

function Page() {
	const { data, textos } = useDataContext();
	const { token, userId } = useAuthContext();
	const router = useRouter();

	const {
		data: auctionsData,
		error,
		isLoading,
	} = useQuery(["auctionsData", token, userId], () =>
		fetchAuctions(token, userId)
	);

	function fixImageUrl(url: any) {
		if (!url) {
			return "";
		}

		if (url.startsWith("//")) {
			return `https:${url}`;
		}

		return url;
	}

	const handleCardClick = (idSubasta: any) => {
		router.push(`/app/subastas/${idSubasta}`);
	};

	if (isLoading)
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
					<h1 className="text-blueEmmagini text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	if (error) return <div>Error al cargar los datos de subastas</div>;

	return (
		<div className="pb-4">
			<div>
				<h1 className="mt-10 text-white text-left font-bold text-xl sm:text-2xl md:text-3xl ml-4 mt-20">
					Subastas
				</h1>
			</div>

			{auctionsData && auctionsData.mias && auctionsData.mias.length > 0 && (
				<div className="w-full lg:w-[1300px] lg:ml-10 mt-10 lg:mt-20 mx-auto px-2 sm:px-4">
					<h2 className="text-white text-lg md:text-xl font-semibold ml-2 sm:ml-4">
						{textos?.lbl_subastas_missubastas}
					</h2>
					<div className="px-2 py-8 lg:px-4 lg:py-6">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
							{auctionsData.mias.map((subasta: any) => (
								<div key={subasta.id} className="flex justify-start w-full">
									<CardGames
										cardClassName="drop-shadow-lg w-full max-w-[450px] md:max-w-[500px]"
										imageContainer="flex justify-start items-center"
										imageClassName="w-[80px] h-[130px] sm:w-[150px] sm:h-[155px] md:w-[180px] md:h-[180px] lg:w-[191px] lg:h-[191px]"
										image={fixImageUrl(subasta.imagen)}
										alt={subasta.nombre}
										title={subasta.nombre}
										description={subasta.descripcion}
										altText={`Ganador actual: ${subasta.usuario}`}
										buttonRouter={true}
										buttonRouterClassName="bg-blueEmmagini text-white text-xs sm:text-sm lg:text-base w-full max-w-[200px] h-[36px] flex items-center justify-center"
										buttonText={textos.subasta_pujar}
										onClick={() => handleCardClick(subasta.id)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{auctionsData && auctionsData.otras && auctionsData.otras.length > 0 && (
				<div className="w-full lg:w-[1300px] lg:ml-10 mt-10 lg:mt-20 mx-auto px-2 sm:px-4">
					<h2 className="text-white text-sm md:text-base font-semibold ml-2 sm:ml-4">
						{textos?.lbl_subastas_otrassubastas}
					</h2>
					<div className="px-2 py-8 lg:px-4 lg:py-6">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
							{auctionsData.otras.map((subasta: any) => (
								<div key={subasta.id} className="flex justify-start w-full">
									<CardGames
										cardClassName="drop-shadow-lg w-full max-w-[450px] md:max-w-[500px]"
										imageContainer="flex justify-start items-center"
										imageClassName="w-[80px] h-[130px] sm:w-[150px] sm:h-[155px] md:w-[180px] md:h-[180px] lg:w-[191px] lg:h-[191px]"
										image={fixImageUrl(subasta.imagen)}
										alt={subasta.nombre}
										altText={`Ganador actual: ${subasta.usuario}`}
										title={subasta.nombre}
										description={subasta.descripcion}
										buttonRouter={true}
										buttonRouterClassName="bg-blueEmmagini text-white text-xs sm:text-sm lg:text-base w-full max-w-[200px] h-[36px] flex items-center justify-center"
										buttonText={textos.subasta_pujar}
										onClick={() => handleCardClick(subasta.id)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Page;
