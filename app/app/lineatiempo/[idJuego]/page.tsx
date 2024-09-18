"use client";
import { useState } from "react";
import Image from "next/image";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

function Page({ params: { idJuego } }: ComponentProps) {
	const { infoGames } = useDataContext();
	const [images, setImages] = useState<any[]>([]);

	const game = infoGames?.find((gameItem: any) => gameItem.id === idJuego);

	useState(() => {
		if (game?.data?.images) {
			setImages(game.data.images);
		}

		// @ts-ignore
	}, [game]);

	const onDragEnd = (result: any) => {
		console.log(result);

		if (!result.destination) {
			return;
		}

		const items = Array.from(images);
		const [movedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, movedItem);

		setImages(items);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen mt-20">
			<h1 className="text-white text-center text-2xl font-bold">
				{game?.titulo}
			</h1>
			<h1 className="text-white text-center text-base font-medium mt-4">
				{game?.extra || ""}
			</h1>

			<RoundButton
				buttonClassName="bg-lime-600 w-[240px] h-[29px] mt-4"
				text="Validar"
				textClassName="text-white"
			/>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="grid grid-cols-1 gap-4 mt-8"
						>
							{images.map((image: any, index: number) => (
								<Draggable key={image.id} draggableId={image.id} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="w-[200px] h-[100px] relative mb-2 rounded-lg mx-auto"
										>
											<Image
												src={image.img}
												alt={`product image ${index}`}
												className="w-[200px] h-[120px] object-cover rounded-lg"
												layout="fill"
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default Page;
