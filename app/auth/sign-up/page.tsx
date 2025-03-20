"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LockKeyhole, User } from "lucide-react";
import RoundButton from "@/app/components/buttons/RoundButton";
import { ToggleInputVisionButton } from "@/app/components/buttons/ToggleInputVisionButton";

const formSchema = z.object({
	username: z.string().min(1),
	email: z.string().email().min(1),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const router = useRouter();
	const { singUpNewUser, lang } = useAuthContext();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || "";

	const { register, handleSubmit, formState } = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const [loginTextResponse, setLoginTextResponse] = useState<any>(null);

	const fetchLoginText = useCallback(async () => {
		try {
			const data = new URLSearchParams();
			data.append("host", HOST_URL);
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

	const onSubmit = useCallback(
		async (data: FormSchema) => {
			try {
				await singUpNewUser(
					data.username,
					data.email,
					data.password,
					data.confirmPassword
				);

				router.push("/auth/login/email");
			} catch (error) {
				console.error("Error al registrar el usuario:", error);
			}
		},
		[singUpNewUser]
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	return (
		<div className="w-full flex flex-col gap-5 justify-center items-center">
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-black font-bold text-center md:text-2xl text-xl">
					{loginTextResponse?.keytext.registro_titulo}
				</h1>
			</div>

			<form
				className="flex flex-col gap-5 items-center justify-center w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full".concat(
						" ",
						formState.errors.username ? "border border-red-500" : ""
					)}
				>
					<User className="text-sky-400" size={23} />
					<input
						{...register("username")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full"
						placeholder={loginTextResponse?.keytext.registro_nombre}
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full".concat(
						" ",
						formState.errors.email ? "border border-red-500" : ""
					)}
				>
					<User className="text-sky-400" size={23} />
					<input
						{...register("email")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full"
						placeholder={loginTextResponse?.keytext.registro_email}
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full h-[49px]".concat(
						" ",
						formState.errors.password ? "border border-red-500" : ""
					)}
				>
					<LockKeyhole className="text-sky-400" size={23} />
					<input
						{...register("password")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-[49px] border-0 focus:outline-none focus:ring-0"
						placeholder={loginTextResponse?.keytext.registro_clave_1}
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full h-[49px]".concat(
						" ",
						formState.errors.confirmPassword ? "border border-red-500" : ""
					)}
				>
					<LockKeyhole className="text-sky-400" size={23} />
					<input
						{...register("confirmPassword")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-[49px] border-0  focus:outline-none focus:ring-0"
						placeholder={loginTextResponse?.keytext.registro_clave_2}
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<RoundButton
					type="submit"
					text={loginTextResponse?.keytext.registro_ingresar}
					buttonClassName="border border-sky-700 hover:bg-sky-800 bg-sky-700 py-3 px-3 w-full"
					textClassName="text-white"
				/>
			</form>

			<div className="w-full flex flex-row items-center justify-center">
				<p className="text-gray-400 font-regular text-center text-md">
					Ya tienes una cuenta?{" "}
					<span className="text-blue-400 hover:text-blue-500">
						<Link href="./login">Ingresa aqui</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
