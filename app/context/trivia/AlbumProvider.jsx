"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useQuery } from "react-query";

export const AlbumDataContext = createContext();

export const AlbumDataProvider = ({ children }) => {
	const [idAlbum, setIdAlbum] = useState(null);
	const { userId, token } = useAuthContext();

	// Función para hacer la solicitud a la API
	const fetchAlbumData = async () => {
		if (!idAlbum || !token || !userId) {
			console.warn("idAlbum, token, or userId is missing");
			return;
		}

		const response = await axios.post(
			"https://backend.emmagini.com/api2/get_album",
			{
				id: idAlbum,
				token,
				userid: userId,
				host: "demo25.emmagini.com",
				callback: "https://demo25.emmagini.com/home.php#v=inicio",
				lang: "es",
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			}
		);

		return response.data.content;
	};

	const {
		data: dataAlbum,
		error,
		isLoading,
	} = useQuery(["albumData", idAlbum, token, userId], fetchAlbumData, {
		enabled: !!idAlbum && !!token && !!userId,
		refetchOnWindowFocus: false,
		staleTime: 60000,
	});

	return (
		<AlbumDataContext.Provider
			value={{
				dataAlbum,
				setIdAlbum,
				isLoading,
				error,
			}}
		>
			{children}
		</AlbumDataContext.Provider>
	);
};

export const useDataAlbumContext = () => useContext(AlbumDataContext);
