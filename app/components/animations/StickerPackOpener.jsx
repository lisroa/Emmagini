import { useEffect, useState } from "react";
import Image from "next/image";

const StickerPackOpener = ({ stickers, onClose }) => {
	const [revealedStickers, setRevealedStickers] = useState([]);
	const [isOpened, setIsOpened] = useState(false);

	useEffect(() => {
		let timeoutId;
		if (isOpened) {
			stickers.forEach((sticker, index) => {
				timeoutId = setTimeout(() => {
					setRevealedStickers((prev) => [...prev, sticker]);
				}, index * 500);
			});
		} else {
			timeoutId = setTimeout(() => {
				setIsOpened(true);
			}, 1000);
		}
		return () => clearTimeout(timeoutId);
	}, [isOpened, stickers]);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
			<div className={`sticker-pack ${isOpened ? "opened" : ""}`}>
				<div className="envelope" />
				<div className="stickers-grid">
					{revealedStickers.map((sticker, index) => (
						<Image
							key={index}
							src={sticker.ruta}
							alt="Sticker"
							className="sticker"
							width={200}
							height={200}
						/>
					))}
				</div>
				{isOpened && (
					<button
						onClick={onClose}
						className="mt-6 bg-blueEmmagini text-white px-4 py-2 rounded-lg"
					>
						Cerrar
					</button>
				)}
			</div>
		</div>
	);
};

export default StickerPackOpener;
