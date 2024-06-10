import { useEffect } from "react";

const CleanLocalStorageOnMount = () => {
	useEffect(() => {
		const itemsToRemove = [
			"param",
			"serieId",
			"tournamentId",
			"action",
			"partidoId",
			"token",
			"user_id",
		];
		itemsToRemove.forEach((item) => {
			localStorage.removeItem(item);
		});
	}, []);

	return null;
};

export default CleanLocalStorageOnMount;
