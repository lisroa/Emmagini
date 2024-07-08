"use client";

import { useRouter } from "next/navigation";
import { useDataAlbumContext } from "@/app/context/trivia/AlbumProvider";

interface ComponentProps {
	params: {
		idTrivia: string;
	};
}

export default function Page({ params: { idTrivia } }: ComponentProps) {
	const { dataAlbum } = useDataAlbumContext();
	const router = useRouter();

	if (!dataAlbum) {
		return <div className="mt-20 text-black">Cargando...</div>;
	}

	// @ts-ignore
	//const trivia = infoGames.find((triviaItem) => triviaItem.id === idTrivia);

	return (
		<div
			style={{
				backgroundImage: `url(${dataAlbum.imagen_0})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: "100vh",
			}}
		></div>
	);
}
