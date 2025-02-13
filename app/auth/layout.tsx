"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/app/components/styles/loader.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	const clientId =
		"861018734768-mm2f76o6bidnoplpck3i87vdm91vrbut.apps.googleusercontent.com";

	const [themeResponse, setThemeResponse] = useState<any>(null);
	const [loginTextResponse, setLoginTextResponse] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const fetchTheme = useCallback(async () => {
		try {
			const data = new URLSearchParams();
			data.append("host", "demo14.emmagini.com");
			data.append("lang", "es");

			const response = await axios.post(
				"https://backend.emmagini.com/api2/gettheme",
				data,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error en gettheme:", error);
			throw error;
		}
	}, []);

	const fetchLoginText = useCallback(async () => {
		try {
			const data = new URLSearchParams();
			data.append("host", "demo14.emmagini.com");
			data.append("fcm_token", "");
			data.append("id_plataforma", "3");
			data.append("lang", "es");

			const response = await axios.post(
				"https://backend.emmagini.com/api2/login_text",
				data,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error en login_text:", error);
			throw error;
		}
	}, []);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [themeData, loginTextData] = await Promise.all([
					fetchTheme(),
					fetchLoginText(),
				]);
				setThemeResponse(themeData);
				setLoginTextResponse(loginTextData);
			} catch (error) {
				console.error("Error al cargar los datos:", error);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [fetchTheme, fetchLoginText]);

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
					<h1 className="text-blueEmmagini text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<main className="relative min-h-screen max-h-screen w-screen h-screen overscroll-none overflow-hidden bg-black">
				<div className="absolute inset-0 z-0 w-[850px]">
					<Image
						className="object-center w-full h-full"
						src={themeResponse?.fondo_login}
						alt={"Homepage background"}
						layout="fill"
					/>
				</div>

				<div className="relative z-10 flex md:flex-row flex-col items-center justify-center w-full h-full">
					<div className="flex items-center justify-center md:justify-start w-full md:w-5/12 h-auto md:h-full mb-[60px]">
						<Image
							className="md:w-7/12 w-10/12 max-w-60 md:max-w-80"
							src={themeResponse?.logo_login}
							alt={"Emmagini Logo"}
							width={900}
							height={408}
						/>
					</div>

					<div className="flex flex-col items-center justify-center md:p-10 p-7 md:w-5/12 md:h-[80%] md:max-h-[68%] w-[80%] max-h-[68%] bg-white rounded-4xl shadow-lg overflow-auto max-w-[540px]">
						{children}
					</div>
				</div>
			</main>
		</GoogleOAuthProvider>
	);
}
