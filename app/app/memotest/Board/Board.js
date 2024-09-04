import { useDataContext } from "@/app/context/GameDataProvider";
import MemoBlock from "../MemoBlock/MemoBlock";
import "./Board.css";

const Board = ({ animating, handleMemoClick, memoBlocks }) => {
	const { data } = useDataContext();
	return (
		<main className="board">
			{memoBlocks.map((memoBlock, i) => {
				return (
					<MemoBlock
						key={`${i}_${memoBlock.emoji}`}
						animating={animating}
						handleMemoClick={handleMemoClick}
						memoBlock={memoBlock}
						cover={data?.contenidos[3].data.cover}
					/>
				);
			})}
		</main>
	);
};

export default Board;
