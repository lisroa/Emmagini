"use client";

import {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";

export const GameDataContext = createContext();

export const GameDataProvider = ({ children }) => {
	//empresa

	const [empresa, setEmpresa] = useState();

	//Loader
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	//Trae todos los juegos desde demo25
	const [data, setData] = useState();
	const [infoGames, setInfoGames] = useState();
	const [textos, setTextos] = useState();

	//Trae la info de los torneos de truco desde demo23
	const [dataTruco, setDataTruco] = useState();
	const [infoTruco, setInfoTruco] = useState();

	const { userId, token } = useAuthContext();

	const getAppData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/validate",
				{
					callback: "https://demo25.emmagini.com/home.php#v=inicio",
					token,
					userid: userId,
					host: "demo25.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			setData(response.data);
			setInfoGames(response.data.contenidos);
			setTextos(response.data.keytext);
			setEmpresa(response.data.empresa);
			setIsLoading(false);
			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud:", error);
			setIsLoading(false);
			setError(error);
			throw error;
		}
	}, [token, userId]);

	useEffect(() => {
		getAppData();
	}, [token, userId]);

	useEffect(() => {
		console.log(data);
		console.log(infoGames);
		console.log(textos);
	}, [data, infoGames, textos]);

	//Pegamos a validate desde demo23 para traer los torneos de truco

	const getTrucoData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/validate",
				{
					callback: "https://demo25.emmagini.com/home.php#v=inicio",
					token,
					userid: userId,
					host: "demo23.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			setDataTruco(response.data);
			setInfoTruco(response.data.contenidos);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud:", error);

			throw error;
		}
	}, [token, userId]);

	useEffect(() => {
		getTrucoData();
	}, [token, userId]);

	useEffect(() => {
		//console.log("truco", infoTruco);
		console.log("empresa", empresa);
	}, [dataTruco, infoTruco]);

	return (
		<GameDataContext.Provider
			value={{
				data,
				setData,
				infoGames,
				setInfoGames,
				dataTruco,
				setDataTruco,
				infoTruco,
				setInfoTruco,
				textos,
				setTextos,
				isLoading,
				setIsLoading,
				error,
				empresa,
			}}
		>
			{children}
		</GameDataContext.Provider>
	);
};

export const useDataContext = () => useContext(GameDataContext);
