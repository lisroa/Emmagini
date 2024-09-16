import Image from "next/image";
import "./MemoBlock.css";

const MemoBlock = ({ animating, handleMemoClick, memoBlock, cover }) => (
	<div
		className="memo-block"
		onClick={() =>
			!memoBlock.flipped && !animating && handleMemoClick(memoBlock)
		}
	>
		<div
			className={`memo-block-inner ${
				memoBlock.flipped && "memo-block-flipped"
			}`}
		>
			<div className="memo-block-front">
				<Image
					src={cover}
					alt="memo"
					className="memo-image w-full h-full object-cover"
					width={200}
					height={200}
				/>
			</div>
			<div className="memo-block-back">
				{memoBlock.img && (
					<Image
						src={memoBlock.img}
						alt="memo"
						className="memo-image w-full h-full object-cover"
						width={200}
						height={200}
					/>
				)}
			</div>
		</div>
	</div>
);

export default MemoBlock;
