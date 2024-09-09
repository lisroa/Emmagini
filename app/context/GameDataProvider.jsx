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
	//empresa

	const [empresa, setEmpresa] = useState();

	//Trae todos los juegos desde demo25

	const [infoGames, setInfoGames] = useState();
	const [textos, setTextos] = useState();

	//Trae la info de los torneos de truco desde demo23
	const [dataTruco, setDataTruco] = useState();
	const [infoTruco, setInfoTruco] = useState();

	const { userId, token } = useAuthContext();

	/*const getAppData = useCallback(async () => {
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
	}, [getAppData]); */

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

	// Usando React Query para obtener los datos
	const { data, error, isLoading } = useQuery(
		["appData", token, userId], // Clave única para esta query
		fetchAppData,
		{
			enabled: !!token && !!userId, // Solo ejecutar si token y userId existen
			staleTime: 60000, // Mantener los datos frescos por 1 minuto
			refetchOnWindowFocus: false, // Evitar recargar datos cada vez que la ventana se enfoca
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
				dataTruco,
				setDataTruco,
				infoTruco,
				setInfoTruco,

				setTextos,

				data, // Datos obtenidos de la API
				infoGames: data?.contenidos,
				textos: data?.keytext,
				empresa: data?.empresa,
				isLoading, // Estado de carga
				error,
			}}
		>
			{children}
		</GameDataContext.Provider>
	);
};

export const useDataContext = () => useContext(GameDataContext);
