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

export const FrontDataContext = createContext();

export const FrontDataProvider = ({ children }) => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const logOut = useCallback(async () => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("user_id");

		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/logout",
				{
					token: token,
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

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud:", error);
			throw error;
		}
	}, []);

	return (
		<FrontDataContext.Provider
			value={{
				sideMenuOpen,
				setSideMenuOpen,
				modalOpen,
				setModalOpen,
				logOut,
			}}
		>
			{children}
		</FrontDataContext.Provider>
	);
};

export const useDataFrontContext = () => useContext(FrontDataContext);
