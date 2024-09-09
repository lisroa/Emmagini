"use client";

import {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";

// TO-DO: CREAR TORNEOS DE TRUCO EN DEMO25 Y ACTUALIZAR HOST EN LA PEGADA

export const GameDataContext = createContext();

export const GameDataProvider = ({ children }) => {
	//Trae la info de los torneos de truco desde demo23
	const [dataTruco, setDataTruco] = useState();
	const [infoTruco, setInfoTruco] = useState();

	const { userId, token } = useAuthContext();

	const fetchAppData = async () => {
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
		return response.data;
	};

	const { data, error, isLoading } = useQuery(
		["appData", token, userId],
		fetchAppData,
		{
			enabled: !!token && !!userId,
			staleTime: 60000,
			refetchOnWindowFocus: false,
		}
	);

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

	return (
		<GameDataContext.Provider
			value={{
				data,
				infoGames: data?.contenidos,
				textos: data?.keytext,
				empresa: data?.empresa,
				isLoading,
				error,
				dataTruco,
				setDataTruco,
				infoTruco,
			}}
		>
			{children}
		</GameDataContext.Provider>
	);
};

export const useDataContext = () => useContext(GameDataContext);
