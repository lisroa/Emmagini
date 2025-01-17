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
		idCategoria: string;
	};
}

export default function Page({
	params: { idMuseo, idCategoria },
}: ComponentProps) {
	const { infoGames, empresa } = useDataContext();
	const router = useRouter();

	useEffect(() => {
		// Limpiar la imagen de fondo al desmontar el componente
		return () => {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundColor = "white";
		};
	}, []);

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

	const productos = museo.productos.filter(
		(productItem: any) => productItem.id_categoria === idCategoria
	);
	const categoria = museo.categorias.find(
		(categoria: any) => categoria.id === idCategoria
	);

	useEffect(() => {
		if (categoria?.imagen_0 && categoria.imagen_0 !== "") {
			document.body.style.backgroundImage = `url(${categoria.imagen_0})`;
			document.body.style.backgroundSize = "cover";
			document.body.style.backgroundPosition = "center";
			document.body.style.backgroundRepeat = "no-repeat";
		} else if (empresa?.fondo) {
			document.body.style.backgroundImage = `url(https://backend.emmagini.com/uploads/${empresa.fondo})`;
			document.body.style.backgroundSize = "cover";
			document.body.style.backgroundPosition = "center";
			document.body.style.backgroundRepeat = "no-repeat";
		} else {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundColor = "white";
		}
	}, [categoria, museo]);

	const handleCardClick = (idProducto: any) => {
		router.push(`/app/museo/${idMuseo}/${idCategoria}/${idProducto}`);
	};

	return (
		<div className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32">
			<h1 className="text-white font-bold text-2xl">{`${museo.titulo} - ${categoria.titulo}`}</h1>
			<div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
				{productos &&
					Object.values(productos).map((producto: any) => (
						<WhileTap key={producto.id}>
							<div className="flex justify-center" key={producto.id}>
								<CardHome
									onClick={() => handleCardClick(producto.id)}
									text={producto.titulo}
									imageCard={producto.imagen_0 || producto.imagen_1}
								/>
							</div>
						</WhileTap>
					))}
			</div>
		</div>
	);
}
