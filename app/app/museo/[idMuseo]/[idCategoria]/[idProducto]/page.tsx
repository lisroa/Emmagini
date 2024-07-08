"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDataContext } from "@/app/context/GameDataProvider";
import { Carousel } from "flowbite-react";

interface ComponentProps {
	params: {
		idMuseo: string;
		idCategoria: string;
		idProducto: string;
	};
}

export default function Page({
	params: { idMuseo, idCategoria, idProducto },
}: ComponentProps) {
	const { infoGames } = useDataContext();
	const router = useRouter();

	if (!infoGames) {
		return <div className="mt-20 text-black">Cargando...</div>;
	}

	// @ts-ignore
	const museo = infoGames.find((museoItem) => museoItem.id === idMuseo);
	const categoria = museo.categorias.find(
		// @ts-ignore
		(categoria) => categoria.id === idCategoria
	);

	const product = museo.productos.find(
		// @ts-ignore
		(productItem) => productItem.id === idProducto
	);

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	// Función para extraer URLs de imágenes
	const extractImageUrls = (): string[] => {
		const imageUrls = [];
		for (let i = 0; i <= 10; i++) {
			const imageUrl = product[`imagen_${i}`];
			if (imageUrl) {
				imageUrls.push(imageUrl);
			}
		}
		return imageUrls;
	};

	const imageUrls = extractImageUrls();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 mt-20 pb-20">
			<div
				className="blog-content text-black mt-6 w-full sm:w-[480px] md:w-[580px] bg-gray-300 mx-auto"
				dangerouslySetInnerHTML={{ __html: product.descripcion }}
			></div>
			<div className="w-full sm:w-[480px] md:w-[580px] h-auto relative mt-6 mx-auto mb-8">
				<div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
					<Carousel>
						{imageUrls.map((url, index) => (
							<Image
								key={index}
								src={fixImageUrl(url)}
								alt={`product image ${index}`}
								className="w-full h-auto object-cover"
								width={580}
								height={725}
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
							/>
						))}
					</Carousel>
				</div>
			</div>
			<div
				className="blog-content text-black mt-6 w-full sm:w-[480px] md:w-[580px] bg-gray-400 mx-auto"
				dangerouslySetInnerHTML={{ __html: product.contenido }}
			></div>
		</div>
	);
}
