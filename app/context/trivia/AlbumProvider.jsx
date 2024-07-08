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

export const AlbumDataContext = createContext();

export const AlbumDataProvider = ({ children }) => {
	const [idAlbum, setIdAlbum] = useState(null);
	const [dataAlbum, setDataAlbum] = useState();

	const { userId, token } = useAuthContext();

	const getAlbumData = useCallback(async () => {
		// Verificar que idAlbum, token y userId tengan valores
		if (!idAlbum || !token || !userId) {
			console.warn("idAlbum, token, or userId is missing");
			return;
		}

		try {
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

			setDataAlbum(response.data.content);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud:", error);
			throw error;
		}
	}, [idAlbum, token, userId]);

	useEffect(() => {
		getAlbumData();
	}, [getAlbumData]);

	return (
		<AlbumDataContext.Provider
			value={{
				dataAlbum,
				setDataAlbum,
				idAlbum,
				setIdAlbum,
			}}
		>
			{children}
		</AlbumDataContext.Provider>
	);
};

export const useDataAlbumContext = () => useContext(AlbumDataContext);
