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
	//Side Menu
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	//PRODUCTOS
	const [productos, setProductos] = useState();

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

	// Traer los PRODUCTOS
	// TO-DO: Armar la seccion de perfil del usuario para que pueda elegir el club y poder pasarlo dinamicamente a esta pegada

	const getProducts = useCallback(async () => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("user_id");

		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/get_productos",
				{
					token: token,
					userid: userId,
					host: "demo14.emmagini.com",
					id_club: "e6b564b3-c526-11ee-bc84-ec15a2edbff6",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);
			setProductos(response.data);
			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud:", error);
			throw error;
		}
	}, []);

	/*useEffect(() => {
		console.log("productos", productos);
	}, []); */

	return (
		<FrontDataContext.Provider
			value={{
				sideMenuOpen,
				setSideMenuOpen,
				modalOpen,
				setModalOpen,
				logOut,
				getProducts,
			}}
		>
			{children}
		</FrontDataContext.Provider>
	);
};

export const useDataFrontContext = () => useContext(FrontDataContext);
