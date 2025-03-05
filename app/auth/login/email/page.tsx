"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { LockKeyhole, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/app/context/AuthProvider";
import RoundButton from "@/app/components/buttons/RoundButton";
import { ToggleInputVisionButton } from "@/app/components/buttons/ToggleInputVisionButton";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "@/app/components/styles/loader.css";

const formSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const router = useRouter();
	const { signInWithEmailAndPassword, lang } = useAuthContext();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [loginTextResponse, setLoginTextResponse] = useState<any>(null);

	const { register, handleSubmit, formState } = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = useCallback(
		(data: FormSchema) => {
			signInWithEmailAndPassword(data.email, data.password);
			router.push("/app");
		},
		[formState.isValid, router, signInWithEmailAndPassword]
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

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
		<div className="w-full flex flex-col gap-5 justify-center items-center">
			<div className="flex flex-col items-center justify-center shadow-lg rounded-full p-3 w-14 h-14 bg-white">
				<Image
					className=""
					src={"/assets/icons/login_icon.png"}
					alt={"Login Icon"}
					width={40}
					height={40}
				/>
			</div>

			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-black font-bold text-center md:text-2xl text-xl">
					{loginTextResponse?.keytext.registro_expo_titulo}
				</h1>
				<h6 className="text-gray-400 font-regular text-center md:text-sm">
					{loginTextResponse?.keytext.inicio_titulo}
				</h6>
			</div>

			<form
				className="flex flex-col gap-5 items-center justify-center w-6/12 min-w-72"
				onSubmit={handleSubmit(onSubmit)}
			>
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
						placeholder={loginTextResponse?.keytext.login_email}
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full h-[49px]".concat(
						" ",
						formState.errors.password ? "border border-red-500" : ""
					)}
				>
					<div>
						<LockKeyhole className="text-sky-400" size={23} />
					</div>
					<input
						{...register("password")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full border-none focus:outline-none focus:ring-0"
						placeholder={loginTextResponse?.keytext.login_clave}
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<RoundButton
					text={loginTextResponse?.keytext.registro_expo}
					type="submit"
					buttonClassName="border border-sky-700 hover:bg-sky-800 bg-sky-700 h-14 py-3 px-3 w-full"
					textClassName="text-white"
				/>
			</form>

			<div className="w-full flex flex-row items-center justify-center">
				<p className="text-gray-400 font-regular text-center text-md">
					No tienes una cuenta?{" "}
					<span className="text-blue-400 hover:text-blue-500">
						<Link href="../login" className="text-blueEmmagini">
							Registrate aqui
						</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
