import { useEffect } from "react";

const CleanLocalStorageOnMount = () => {
	useEffect(() => {
		console.log("Component mounted, cleaning localStorage");
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
			console.log(`Removing item: ${item}`);
			localStorage.removeItem(item);
		});
		console.log("LocalStorage cleaned");
	}, []);

	return null;
};

export default CleanLocalStorageOnMount;
