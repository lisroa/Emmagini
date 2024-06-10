"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDataContext } from "@/app/context/GameDataProvider";

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

	const museo = infoGames.find((museoItem) => museoItem.id === idMuseo);
	const categoria = museo.categorias.find(
		(categoria) => categoria.id === idCategoria
	);

	const product = museo.productos.find(
		(productItem) => productItem.id === idProducto
	);

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 mt-20">
			<div
				className="blog-content text-black mt-6 w-full sm:w-[480px] md:w-[580px] bg-gray-300 mx-auto"
				dangerouslySetInnerHTML={{ __html: product.descripcion }}
			></div>
			<div className="w-full sm:w-[480px] md:w-[580px] h-auto relative mt-6 mx-auto">
				<Image
					src={fixImageUrl(product.imagen_0)}
					alt="image product blog"
					className="w-full h-auto object-cover"
					width={580}
					height={725}
					sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
				/>
			</div>
			<div
				className="blog-content text-black mt-6 w-full sm:w-[480px] md:w-[580px] bg-gray-400 mx-auto"
				dangerouslySetInnerHTML={{ __html: product.contenido }}
			></div>
			<div className="w-full sm:w-[480px] md:w-[580px] h-auto relative mt-6 mx-auto mb-8">
				<Image
					src={fixImageUrl(product.imagen_3)}
					alt="image product blog"
					className="w-full h-auto object-cover"
					width={580}
					height={725}
					sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
				/>
			</div>
		</div>
	);
}
