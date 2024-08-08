"use client";

import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/context/GameDataProvider";
import CardHome from "@/app/components/cards/CardHome";
import WhileTap from "@/app/components/animations/WhileTap";

interface ComponentProps {
	params: {
		idMuseo: string;
	};
}

export default function Page({ params: { idMuseo } }: ComponentProps) {
	const { infoGames } = useDataContext();
	const router = useRouter();

	if (!infoGames) {
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
					<h1 className="text-blueEmmagini text-center mt-4 font-bold">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	const museo = infoGames.find((museoItem: any) => museoItem.id === idMuseo);

	const handleCardClick = (idCategoria: any) => {
		router.push(`/app/museo/${idMuseo}/${idCategoria}`);
	};

	return (
		<div className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32">
			<h1 className="text-white font-bold text-2xl">{museo.titulo}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
				{museo &&
					Object.values(museo.categorias).map((categoria) => (
						// @ts-ignore
						<WhileTap key={categoria.id}>
							{/*// @ts-ignore */}
							<div className="flex justify-center" key={categoria.id}>
								<CardHome
									/*// @ts-ignore */
									onClick={() => handleCardClick(categoria.id)}
									/*// @ts-ignore */
									text={categoria.titulo}
									/*// @ts-ignore */
									imageCard={categoria.imagen_0 || categoria.imagen_1}
								/>
							</div>
						</WhileTap>
					))}
			</div>
		</div>
	);
}
