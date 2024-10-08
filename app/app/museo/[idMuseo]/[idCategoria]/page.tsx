"use client";

import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/context/GameDataProvider";
import CardHome from "@/app/components/cards/CardHome";
import WhileTap from "@/app/components/animations/WhileTap";
import "@/app/components/styles/loader.css";
interface ComponentProps {
	params: {
		idMuseo: string;
		idCategoria: string;
	};
}

export default function Page({
	params: { idMuseo, idCategoria },
}: ComponentProps) {
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
					<h1 className="text-white text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}
	// @ts-ignore
	const museo = infoGames.find((museoItem) => museoItem.id === idMuseo);

	const productos = museo.productos.filter(
		// @ts-ignore
		(productItem) => productItem.id_categoria === idCategoria
	);
	const categoria = museo.categorias.find(
		// @ts-ignore
		(categoria) => categoria.id === idCategoria
	);
	// @ts-ignore
	const handleCardClick = (idProducto) => {
		router.push(`/app/museo/${idMuseo}/${idCategoria}/${idProducto}`);
	};

	return (
		<div className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32">
			<h1 className="text-white font-bold text-2xl">{`${museo.titulo} - ${categoria.titulo}`}</h1>
			<div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
				{productos &&
					Object.values(productos).map((producto) => (
						// @ts-ignore
						<WhileTap key={producto.id}>
							{/*// @ts-ignore */}
							<div className="flex justify-center" key={producto.id}>
								<CardHome
									// @ts-ignore
									onClick={() => handleCardClick(producto.id)}
									// @ts-ignore
									text={producto.titulo}
									// @ts-ignore
									imageCard={producto.imagen_0 || producto.imagen_1}
								/>
							</div>
						</WhileTap>
					))}
			</div>
		</div>
	);
}
