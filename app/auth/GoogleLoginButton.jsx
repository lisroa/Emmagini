"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";

const GoogleLoginButton = () => {
	const router = useRouter();

	const { setToken, setUserId, lang } = useAuthContext();

	const TOKEN_KEY = "token";
	const USER_ID_KEY = "user_id";
	const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
	const handleGoogleLoginSuccess = useCallback(
		async (credentialResponse) => {
			console.log("✅ HOST_URL cargado:", HOST_URL);
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/google_login",
					{
						host: HOST_URL,
						client_id: credentialResponse.clientId,
						credential: credentialResponse.credential,
						fcm_token: "",
						es_app: "0",
						id_plataforma: "3",
						lang: lang,
						timezone: "-3",
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				const { token, userid, error, mensaje } = response.data;

				if (error !== 0) {
					return { error, mensaje };
				}

				localStorage.setItem(TOKEN_KEY, token);
				localStorage.setItem(USER_ID_KEY, userid);

				setToken(token);
				setUserId(userid);

				router.push(`/app`);

				return { error, mensaje, token, userid };
			} catch (error) {
				console.error("Error al hacer la solicitud:", error);
				throw error;
			}
		},
		[router]
	);

	return (
		<GoogleLogin
			onSuccess={handleGoogleLoginSuccess}
			onError={() => {
				console.log("Login failed");
			}}
			className="border border-sky-700 rounded-full w-full"
			theme="outline"
			size="large"
			shape="rectangular"
			text="continue_with"
			logo_alignment="center"
		/>
	);
};

export default GoogleLoginButton;
