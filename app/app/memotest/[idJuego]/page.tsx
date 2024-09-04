"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import MemoryGame from "../memoriGame";
import "@/app/components/styles/loader.css";

interface ComponentProps {
	params: {
		idJuego: string;
	};
}

function page({ params: { idJuego } }: ComponentProps) {
	const { token, userId } = useAuthContext();
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState<any>(null);

	const iniciarPartida = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/iniciar_partida",
				{
					token: token,
					userid: userId,
					id_juego: idJuego,
					id_partida: "",
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
		} catch (error) {
			console.error("Error al hacer la solicitud", error);
			throw error;
		}
	}, [token, userId, idJuego]);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const apiResponse = await iniciarPartida();

			setResponse(apiResponse);

			setLoading(false);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
			setLoading(false);
		}
	}, [iniciarPartida]);

	useEffect(() => {
		if (token && userId) {
			fetchData();
		}
	}, [fetchData, token, userId]);

	useEffect(() => {
		console.log("response", response);
	}, [response]);

	if (loading) {
		return (
			<div className="mt-20 text-black">
				<div className="mt-96">
					<section className="dots-container">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</section>
					<h1 className="text-white text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}
	return response ? (
		<MemoryGame idDelJuego={idJuego} idPartida={response.id_partida} />
	) : (
		<div>No se pudo iniciar la partida.</div>
	);
}

export default page;