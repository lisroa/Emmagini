"use client";
import { useState } from "react";
import Image from "next/image";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import { useRef } from "react";
import { motion } from "framer-motion";
import "@/app/components/styles/drapAndDropAnimation.css";

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

function Page({ params: { idJuego } }: ComponentProps) {
	const { infoGames } = useDataContext();
	const [images, setImages] = useState<any[]>([]);
	const constraintsRef = useRef<HTMLDivElement | null>(null);

	const game = infoGames?.find((gameItem: any) => gameItem.id === idJuego);

	// Initialize images
	useState(() => {
		if (game?.data?.images) {
			setImages(game.data.images);
		}

		// @ts-ignore
	}, [game]);

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		index: number
	) => {
		e.dataTransfer.setData("text/plain", index.toString());
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
		e.preventDefault();
		const startIndex = parseInt(e.dataTransfer.getData("text/plain"));
		const newImages = [...images];
		const [movedItem] = newImages.splice(startIndex, 1);
		newImages.splice(index, 0, movedItem);
		setImages(newImages);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen mt-20">
			<h1 className="text-white text-center text-2xl font-bold">
				{game?.titulo}
			</h1>
			<h1 className="text-white text-center text-base font-medium mt-4">
				{/* // @ts-ignore */}
				{game?.extra || ""}
			</h1>
			{/* <CountdownTimer
    duration={300}
    onTimeOut={finalizarPartidaConTimeout}
    resetTimer={resetTimer}
  /> */}

			<RoundButton
				buttonClassName="bg-lime-600 w-[240px] h-[29px] mt-4"
				text="Validar"
				textClassName="text-white"
			/>

			<div className="grid grid-cols-1 gap-4 mt-8" ref={constraintsRef}>
				{images.map((image: any, imgIndex: number) => (
					<div
						key={imgIndex}
						className="w-[200px] h-[100px] relative mb-4 rounded-lg mx-auto"
						draggable
						onDragStart={(e) => handleDragStart(e, imgIndex)}
						onDrop={(e) => handleDrop(e, imgIndex)}
						onDragOver={handleDragOver}
					>
						<Image
							src={image.img}
							alt={`product image ${imgIndex}`}
							className="w-[200px] h-[120px] object-cover rounded-lg"
							layout="fill"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Page;
