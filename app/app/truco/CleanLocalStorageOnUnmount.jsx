import { useEffect } from "react";

const CleanLocalStorageOnUnmount = () => {
	useEffect(() => {
		return () => {
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
