"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import RoundButton from "@/app/components/buttons/RoundButton";
import { CircleUser, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import CleanLocalStorageOnUnmount from "@/app/app/truco/CleanLocalStorageOnUnmount";
import { useAuthContext } from "@/app/context/AuthProvider";
import GoogleLoginButton from "@/app/auth/GoogleLoginButton";
import "@/app/components/styles/loader.css";

export default function Page() {
	const [loginTextResponse, setLoginTextResponse] = useState<any>(null);
	const { lang } = useAuthContext();

	const fetchLoginText = useCallback(async () => {
		try {
			const data = new URLSearchParams();
			data.append("host", "demo14.emmagini.com");
			data.append("fcm_token", "");
			data.append("id_plataforma", "3");
			data.append("lang", lang);

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
				const [loginTextData] = await Promise.all([fetchLoginText()]);
				setLoginTextResponse(loginTextData);
			} catch (error) {
				console.error("Error al cargar los datos:", error);
			}
		};

		loadData();
	}, [fetchLoginText]);

	return (
		<>
			<CleanLocalStorageOnUnmount />
			<div className="flex flex-col gap-5">
				<div className="w-full flex flex-col items-center justify-center">
					<h1 className="text-black font-bold text-center md:text-2xl text-xl">
						{loginTextResponse?.keytext.registro_expo_titulo}
					</h1>
					<h6 className="text-gray-400 font-regular text-center md:text-sm">
						Lorem ipsum dolor sit amet, consectetur
					</h6>
				</div>

				<div className="w-full max-w-sm flex flex-col gap-5 items-center justify-center">
					<GoogleLoginButton />

					<Link className="w-full" href={"/auth/login/email"}>
						<RoundButton
							logo={<Mail className="text-white" size={20} />}
							text={loginTextResponse?.keytext.inicio_email}
							buttonClassName="border border-sky-700 hover:bg-sky-800 bg-sky-700 py-4 px-8 w-full"
							textClassName="text-white"
						/>
					</Link>

					<Link className="w-full" href={"/auth/sign-up"}>
						<RoundButton
							logo={<CircleUser className="text-white" size={20} />}
							text={loginTextResponse?.keytext.inicio_crear}
							buttonClassName="border border-sky-500 hover:bg-sky-600 bg-sky-500 py-4 px-8 w-full"
							textClassName="text-white"
						/>
					</Link>
				</div>

				{/*<div className="w-full flex flex-row items-center justify-center">
					<p className="text-gray-400 font-regular text-center text-md">
						Forgot your password?{" "}
						<span className="text-blue-400 hover:text-blue-500">
							<Link href="">Click here</Link>
						</span>
					</p>
				</div>*/}
			</div>
		</>
	);
}
