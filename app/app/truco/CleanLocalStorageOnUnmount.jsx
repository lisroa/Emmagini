import { useEffect } from "react";

const CleanLocalStorageOnUnmount = () => {
	useEffect(() => {
		console.log("Component mounted");
		return () => {
			console.log("Component unmounted, cleaning localStorage");
			localStorage.removeItem("param");
			localStorage.removeItem("serieId");
			localStorage.removeItem("tournamentId");
			localStorage.removeItem("action");
			localStorage.removeItem("partidoId");
			localStorage.removeItem("token");
			localStorage.removeItem("user_id");
		};
	}, []);
	return null;
};

export default CleanLocalStorageOnUnmount;
