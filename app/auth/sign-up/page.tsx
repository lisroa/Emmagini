"use client";

import { LockKeyhole, User } from "lucide-react";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import { useCallback, useState } from "react";
import { ToggleInputVisionButton } from "@/app/components/buttons/ToggleInputVisionButton";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthProvider";

const formSchema = z.object({
	username: z.string().min(1),
	email: z.string().email().min(1),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const router = useRouter();

	const { singUpNewUser } = useAuthContext();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const { register, handleSubmit, formState } = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	// TODO: Migrar metodo a authContext, similar a lo que hicimos con SignInWithEmailAndPassword.
	const onSubmit = useCallback(
		async (data: FormSchema) => {
			singUpNewUser(
				data.username,
				data.email,
				data.password,
				data.confirmPassword
			);
		},
		[formState.isValid, router]
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	return (
		<div className="w-full flex flex-col gap-5 justify-center items-center">
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-black font-bold text-center md:text-2xl text-xl">
					Register
				</h1>
			</div>

			<form className="flex flex-col gap-5 items-center justify-center w-6/12">
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
						placeholder="Username"
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
						placeholder="Email Address"
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full".concat(
						" ",
						formState.errors.password ? "border border-red-500" : ""
					)}
				>
					<LockKeyhole className="text-sky-400" size={23} />
					<input
						{...register("password")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full"
						placeholder="Password"
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<div
					className={"flex flex-row gap-2 items-center justify-center bg-gray-100 rounded-lg py-3 px-3 w-full".concat(
						" ",
						formState.errors.confirmPassword ? "border border-red-500" : ""
					)}
				>
					<LockKeyhole className="text-sky-400" size={23} />
					<input
						{...register("confirmPassword")}
						className="flex-1 bg-transparent text-black text-lg outline-0 h-full"
						placeholder="Confirm Password"
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<RoundButton
					onClick={handleSubmit(onSubmit)}
					text={"Submit"}
					buttonClassName="border border-sky-700 hover:bg-sky-800 bg-sky-700 h-14"
					textClassName="text-white"
				/>
			</form>

			<div className="w-full flex flex-row items-center justify-center">
				<p className="text-gray-400 font-regular text-center text-md">
					Already have an account? Login{" "}
					<span className="text-blue-400 hover:text-blue-500">
						<Link href="./login">here</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
