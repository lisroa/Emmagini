"use client";
import CardHome from "../cards/CardHome";

interface ModalStickersProps {
	isOpen: boolean;
	onClose: () => void;
	stickersPrices: any;
}

const ModalStickers = ({
	isOpen,
	onClose,
	stickersPrices,
}: ModalStickersProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
			<div className="rounded-lg shadow-lg w-[550px] p-4">
				<h2 className="text-2xl font-bold mb-4 text-center">Sticker Prices</h2>
				<div className="grid grid-cols-2 sm:grid-cols-2 gap-6 mb-4">
					{stickersPrices &&
						stickersPrices.sobres.map((sobre: any) => (
							<CardHome
								key={sobre.id}
								imageCard={`https:${sobre.imagen}`}
								text={sobre.titulo}
								onClick={() => {
									console.log("click a comprar");
								}}
								text2={sobre.price + " monedas"}
							/>
						))}
				</div>
				<div className="flex justify-center">
					<button
						onClick={onClose}
						className="bg-blueEmmagini text-white px-4 py-2 rounded-lg"
					>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalStickers;
