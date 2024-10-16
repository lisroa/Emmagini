"use client";

import { createContext, useState, useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";

export const GameDataContext = createContext();

export const GameDataProvider = ({ children }) => {
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
	// Trae la info de los torneos de truco desde demo4.
	const fetchTrucoData = async () => {
		const response = await axios.post(
			"https://backend.emmagini.com/api2/validate",
			{
				callback: "https://demo4.emmagini.com/home.php#v=inicio",
				token,
				userid: userId,
				host: "demo4.emmagini.com",
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

	const {
		data: dataTruco,
		isLoading: isLoadingTruco,
		error: errorTruco,
	} = useQuery(["trucoData", token, userId], fetchTrucoData, {
		enabled: !!token && !!userId,
		staleTime: 60000,
		refetchOnWindowFocus: false,
	});

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
				isLoadingTruco,
				errorTruco,
				infoTruco: dataTruco?.contenidos,
			}}
		>
			{children}
		</GameDataContext.Provider>
	);
};

export const useDataContext = () => useContext(GameDataContext);
