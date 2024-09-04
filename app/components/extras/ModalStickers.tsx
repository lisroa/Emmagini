/*"use client";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import CardHome from "../cards/CardHome";

interface ModalStickersProps {
	isOpen: boolean;
	onClose: () => void;
	stickersPrices: any;
	idAlbum: any;
}

const ModalStickers = ({
	isOpen,
	onClose,
	stickersPrices,
	idAlbum,
}: ModalStickersProps) => {
	if (!isOpen) return null;

	const { token, userId } = useAuthContext();

	const buySticker = useCallback(
		async (idSobre: any) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/buy",
					{
						album: idAlbum,
						plan: idSobre,
						es_monedas: 0,
						host: "demo25.emmagini.com",
						lang: "es",
						callback: `https://demo25.emmagini.com/home.php#v=album&id=${idAlbum}`,
						token: token,
						userid: userId,
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				console.log("Compra exitosa:", response.data);
			} catch (error) {
				console.error("Error al realizar la compra:", error);
			}
		},
		[idAlbum, token, userId]
	);

	const handleCardClick = (idSobre: any) => {
		buySticker(idSobre);
	};

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
			<div className="rounded-lg shadow-lg md:w-[550px] p-4">
				<h2 className="text-2xl font-bold mb-4 text-center">Sticker Prices</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
					{stickersPrices &&
						stickersPrices.sobres.map((sobre: any) => (
							<CardHome
								key={sobre.id}
								imageCard={`https:${sobre.imagen}`}
								text={sobre.titulo}
								onClick={() => handleCardClick(sobre.id)}
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

export default ModalStickers; */
"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import CardHome from "../cards/CardHome";
import StickerPackOpener from "../animations/StickerPackOpener";
import "@/app/components/styles/stickersAnimation.css"; // Importa los estilos

interface ModalStickersProps {
	isOpen: boolean;
	onClose: () => void;
	stickersPrices: any;
	idAlbum: any;
}

const ModalStickers = ({
	isOpen,
	onClose,
	stickersPrices,
	idAlbum,
}: ModalStickersProps) => {
	// Mueve el uso de hooks fuera de cualquier condición
	const { token, userId } = useAuthContext();
	const [isAnimationVisible, setIsAnimationVisible] = useState(false);
	const [stickers, setStickers] = useState([]);

	const buySticker = useCallback(
		async (idSobre: any) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/buy",
					{
						album: idAlbum,
						plan: idSobre,
						es_monedas: 0,
						host: "demo25.emmagini.com",
						lang: "es",
						callback: `https://demo25.emmagini.com/home.php#v=album&id=${idAlbum}`,
						token: token,
						userid: userId,
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				setStickers(response.data.stickers);
				setIsAnimationVisible(true);
			} catch (error) {
				console.error("Error al realizar la compra:", error);
			}
		},
		[idAlbum, token, userId]
	);

	const handleCardClick = (idSobre: any) => {
		buySticker(idSobre);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
			{isAnimationVisible ? (
				<StickerPackOpener stickers={stickers} onClose={onClose} />
			) : (
				<div className="rounded-lg shadow-lg md:w-[550px] p-4 ">
					<h2 className="text-2xl font-bold mb-4 text-center">
						Sticker Prices
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
						{stickersPrices &&
							stickersPrices.sobres.map((sobre: any) => (
								<CardHome
									key={sobre.id}
									imageCard={`https:${sobre.imagen}`}
									text={sobre.titulo}
									onClick={() => handleCardClick(sobre.id)}
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
			)}
		</div>
	);
};

export default ModalStickers;
