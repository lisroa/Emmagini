import Image from "next/image";
import { useEffect, useState } from "react";
import "./MemoBlock.css";

const MemoBlock = ({ memoBlock, cover, autoFlip = false, width, height }) => {
	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		if (autoFlip) {
			const timer = setTimeout(() => {
				setFlipped(true);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [autoFlip]);

	return (
		<div className="memo-block w-full h-full">
			<div
				className={`memo-block-inner ${flipped ? "memo-block-flipped" : ""}`}
			>
				{/* Front */}
				<div className="memo-block-front">
					<Image
						src={cover}
						alt="memo-cover"
						className="memo-image w-full h-full object-cover rounded-lg"
						width={width}
						height={height}
					/>
				</div>
				{/* Back */}
				<div className="memo-block-back">
					{memoBlock.img && (
						<Image
							src={memoBlock.img}
							alt="memo-back"
							className="memo-image w-full h-full object-cover rounded-lg"
							width={width}
							height={height}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default MemoBlock;
