"use client";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/context/GameDataProvider";
import CardGames from "@/app/components/cards/CardGames";

import tester from "@/public/assets/cards/imageCard.png";

function Page() {
	const { data } = useDataContext();
	const router = useRouter();

	function fixImageUrl(url: string | undefined) {
		if (!url) {
			return "";
		}

		if (url.startsWith("//")) {
			return `https:${url}`;
		}

		return url;
	}

	const handleCardClick = (idSubasta: string) => {
		router.push(`/app/subastas/${idSubasta}`);
	};

	return (
		<div className="pb-[10px]">
			<div>
				<h1 className="mt-20 text-black text-center font-bold text-2xl">
					Subastas
				</h1>
			</div>
			{data && data.subastas.mias && data.subastas.mias.length > 0 && (
				<div className="w-[336px] lg:w-[1300px] h-auto lg:ml-24 mt-20">
					<h2 className="text-black text-xs font-semibold ml-6">
						Participando
					</h2>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-20 mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
							{data.subastas.mias.map((subasta) => (
								<div
									key={subasta.id}
									className="flex justify-center w-[300px] h-[185px] lg:w-[500px] lg:h-[214px]"
								>
									<CardGames
										cardClassName="drop-shadow-lg"
										imageContainer="flex justify-center items-center"
										imageClassName=" w-[91px] h-[155px] lg:w-[191px] h-[155px]"
										image={fixImageUrl(subasta.imagen)}
										alt={subasta.nombre}
										altText={`Ganador actual: ${subasta.usuario}`}
										title={subasta.nombre}
										description={subasta.descripcion}
										div={true}
										divText="Ofertar"
										divClassName="bg-blueEmmagini text-white w-[209px] h-[36px] align-middle text-center"
										onClick={() => handleCardClick(subasta.id)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{data && data.subastas.otras && data.subastas.otras.length > 0 && (
				<div className="w-[336px] lg:w-[1300px] h-auto lg:mt-14 lg:ml-20">
					<h2 className="text-black text-xs font-semibold ml-6">
						Otras subastas
					</h2>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
							{data &&
								data.subastas.otras &&
								data.subastas.otras.map((subasta) => (
									<div
										key={subasta.id}
										className="flex justify-center w-[300px] h-[185px] lg:w-[500px] lg:h-[214px]"
									>
										<CardGames
											cardClassName="drop-shadow-lg"
											imageContainer="flex justify-center items-center"
											imageClassName=" w-[91px] h-[155px] lg:w-[191px] h-[155px]"
											image={fixImageUrl(subasta.imagen)}
											alt={subasta.nombre}
											altText={`Ganador actual: ${subasta.usuario}`}
											title={subasta.nombre}
											description={`Ganador actual: ${subasta.descripcion}`}
											buttonRouter={true}
											buttonRouterClassName="bg-blueEmmagini text-white w-[160px] h-[36px] lg:w-[209px] h-[36px]"
											buttonText="Ofertar"
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
