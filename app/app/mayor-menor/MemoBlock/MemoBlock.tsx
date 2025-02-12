import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MemoBlockProps {
	memoBlock: { img?: string | null };
	cover: string;
	autoFlip?: boolean;
	controlledFlip?: boolean;
	flipDirection?: number;
	width: number;
	height: number;
}

const MemoBlock: React.FC<MemoBlockProps> = ({
	memoBlock,
	cover,
	autoFlip = false,
	controlledFlip,
	flipDirection = 1,
	width,
	height,
}) => {
	const [internalFlip, setInternalFlip] = useState(false);

	useEffect(() => {
		if (autoFlip && controlledFlip === undefined) {
			const timer = setTimeout(() => {
				setInternalFlip(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [autoFlip, controlledFlip]);

	const flipState =
		controlledFlip !== undefined ? controlledFlip : internalFlip;
	const targetRotation = flipState ? 180 * flipDirection : 0;

	return (
		<motion.div
			style={{ perspective: 1000, width: `${width}px`, height: `${height}px` }}
		>
			<motion.div
				animate={{ rotateY: targetRotation }}
				transition={{ duration: 0.7 }}
				style={{
					width: "100%",
					height: "100%",
					transformStyle: "preserve-3d",
					position: "relative",
				}}
			>
				{/* Lado frontal: muestra la cover */}
				<motion.div
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
					}}
				>
					<Image
						src={cover}
						alt="Cover"
						width={width}
						height={height}
						style={{ borderRadius: "8px", objectFit: "cover" }}
					/>
				</motion.div>

				{/* Lado trasero: muestra la imagen (si existe) */}
				<motion.div
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					{memoBlock.img && (
						<Image
							src={memoBlock.img}
							alt="Memo Back"
							width={width}
							height={height}
							style={{ borderRadius: "8px", objectFit: "cover" }}
						/>
					)}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default MemoBlock;
