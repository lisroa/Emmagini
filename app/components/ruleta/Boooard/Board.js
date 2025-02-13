import MemoBlock from "@/app/components/ruleta/MemoBlock/MemoBlock";
import "./Board.css";

const Board = ({ animating, handleMemoClick, memoBlocks }) => {
	return (
		<main className="tabla grid grid-cols-3 gap-4">
			{memoBlocks.map((memoBlock, i) => (
				<MemoBlock
					key={`${i}_${memoBlock.emoji}`}
					animating={animating}
					handleMemoClick={handleMemoClick}
					memoBlock={memoBlock}
				/>
			))}
		</main>
	);
};

export default Board;
