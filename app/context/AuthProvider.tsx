// @ts-nocheck

"use client";

import React, { createContext } from "react";

import axios from "axios";
import { useState, useContext, useEffect, useCallback } from "react";

const TOKEN_KEY = "token";
const USER_ID_KEY = "user_id";

interface AuthContextValues {
	userId: string;
	token: string;
	signInWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;

	singUpNewUser: (
		userName: string,
		email: string,
		password: string,
		confirmPassword: string
	) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValues>({} as any);

export const AuthProvider = ({ children }) => {
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");

	const singUpNewUser = useCallback(
		async (
			username: string,
			email: string,
			password: string,
			confirmPassword: string
		) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/registrar",
					{
						username: email,
						fullname: username,
						password: password,
						repassword: confirmPassword,
						lang: "es",
						host: "demo25.emmagini.com",
						timezone: -3,
						fcm_token: "",
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				return response.data;
			} catch (error) {
				console.error("Error al hacer la solicitud:", error);
				throw error;
			}
		},
		[]
	);

	const signInWithEmailAndPassword = useCallback(
		async (email: string, password: string) => {
			try {
				const response = await axios.post(
					"https://backend.emmagini.com/api2/gettoken",
					{
						username: email,
						password: password,
						timezone: -3,
						fcm_token: "",
						id_plataforma: 3,
						lang: "es",
						host: "demo25.emmagini.com",
					},
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				const { token, userid } = response.data;

				localStorage.setItem(TOKEN_KEY, token);
				localStorage.setItem(USER_ID_KEY, userid);

				setToken(token);
				setUserId(userid);

				return response.data;
			} catch (error) {
				console.error("Error al hacer la solicitud:", error);
				throw error;
			}
		},
		[]
	);

	useEffect(() => {
		const getCacheData = () => {
			const cachedToken = localStorage.getItem(TOKEN_KEY);
			const cachedUserId = localStorage.getItem(USER_ID_KEY);
			if (cachedToken && cachedUserId) {
				setToken(cachedToken);
				setUserId(cachedUserId);
			}
		};

		getCacheData();
	}, []);

	/*useEffect(() => {
    console.log("token:", token);
    console.log("userId:", userId);
  }, [token, userId]); */

	return (
		<AuthContext.Provider
			value={{
				userId,
				token,
				signInWithEmailAndPassword,
				singUpNewUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
