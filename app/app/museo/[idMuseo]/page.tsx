"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDataContext } from "@/app/context/GameDataProvider";
import CardHome from "@/app/components/cards/CardHome";
import WhileTap from "@/app/components/animations/WhileTap";
import "@/app/components/styles/loader.css";

interface ComponentProps {
	params: {
		idMuseo: string;
	};
}

export default function Page({ params: { idMuseo } }: ComponentProps) {
	const { infoGames, empresa } = useDataContext();
	const router = useRouter();

	useEffect(() => {
		return () => {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundColor = "white";
		};
	}, []);

	useEffect(() => {
		if (infoGames) {
			const museo = infoGames.find(
				(museoItem: any) => museoItem.id === idMuseo
			);

			const backgroundImage =
				museo?.imagen_0 && museo.imagen_0 !== ""
					? museo.imagen_0
					: empresa?.fondo
					? `https://backend.emmagini.com/uploads/${empresa.fondo}`
					: null;

			if (backgroundImage) {
				document.body.style.backgroundImage = `url(${backgroundImage})`;
				document.body.style.backgroundSize = "cover";
				document.body.style.backgroundPosition = "center";
				document.body.style.backgroundRepeat = "no-repeat";
			} else {
				document.body.style.backgroundImage = "";
				document.body.style.backgroundColor = "white";
			}
		}
	}, [infoGames, idMuseo, empresa]);

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
					<h1 className="text-white text-center mt-4 font-bold text-xl">
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
			<h1 className="text-white font-bold text-2xl">{museo?.titulo}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
				{museo &&
					Object.values(museo.categorias).map((categoria: any) => (
						<WhileTap key={categoria.id}>
							<div className="flex justify-center" key={categoria.id}>
								<CardHome
									onClick={() => handleCardClick(categoria.id)}
									text={categoria.titulo}
									imageCard={categoria.imagen_0 || categoria.imagen_1}
								/>
							</div>
						</WhileTap>
					))}
			</div>
		</div>
	);
}
