"use client";

import { createContext, useState, useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";

export const GameDataContext = createContext();

export const GameDataProvider = ({ children }) => {
	const { userId, token, lang } = useAuthContext();
	const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

	const fetchAppData = async () => {
		const response = await axios.post(
			"https://backend.emmagini.com/api2/validate",
			{
				callback: `https://${HOST_URL}/home.php#v=inicio`,
				token,
				userid: userId,
				host: HOST_URL,
				lang: lang,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			}
		);
		return response.data;
	};

	const { data, error, isLoading, refetch } = useQuery(
		["appData", token, userId],
		fetchAppData,
		{
			enabled: !!token && !!userId,
			staleTime: 60000,
			refetchOnWindowFocus: false,
		}
	);

	// Trae la info de los torneos de truco desde demo4.
	/*const fetchTrucoData = async () => {
		const response = await axios.post(
			"https://backend.emmagini.com/api2/validate",
			{
				callback: "https://demo4.emmagini.com/home.php#v=inicio",
				token,
				userid: userId,
				host: "demo4.emmagini.com",
				lang: lang,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			}
		);
		return response.data;
	};

	const {
		data: dataTruco,
		isLoading: isLoadingTruco,
		error: errorTruco,
	} = useQuery(["trucoData", token, userId], fetchTrucoData, {
		enabled: !!token && !!userId,
		staleTime: 60000,
		refetchOnWindowFocus: false,
	}); */

	const empresaModoPremium = isLoading
		? false
		: data?.empresa?.modo_premium !== 0;
	const userModoPremium = isLoading ? false : data?.premium === true;

	return (
		<GameDataContext.Provider
			value={{
				fetchAppData,
				refetchAppData: refetch,
				data,
				infoGames: data?.contenidos,
				textos: data?.keytext,
				empresa: data?.empresa,
				availableLanguages: data?.lang,
				userData: data?.userdata,
				isLoading,
				error,
				//dataTruco,
				//isLoadingTruco,
				//errorTruco,
				//infoTruco: dataTruco?.contenidos,
				empresaModoPremium,
				userModoPremium,
			}}
		>
			{children}
		</GameDataContext.Provider>
	);
};

export const useDataContext = () => useContext(GameDataContext);
