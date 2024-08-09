"use client";

import Image from "next/image";
import { LockKeyhole, User } from "lucide-react";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import { useCallback, useState } from "react";
import { ToggleInputVisionButton } from "@/app/components/buttons/ToggleInputVisionButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthContext } from "@/app/context/AuthProvider";

const formSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const router = useRouter();

	const { signInWithEmailAndPassword } = useAuthContext();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
					Login
				</h1>
				<h6 className="text-gray-400 font-regular text-center md:text-sm">
					Login your account
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
						placeholder="Email"
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
						placeholder="Password"
						type={isPasswordVisible ? "text" : "password"}
					/>
					<ToggleInputVisionButton
						className="text-sky-700"
						onClick={handleTogglePasswordVisibility}
						isVisible={isPasswordVisible}
					/>
				</div>

				<RoundButton
					text={"Submit"}
					type="submit"
					buttonClassName="border border-sky-700 hover:bg-sky-800 bg-sky-700 h-14 py-3 px-3 w-full"
					textClassName="text-white"
				/>
			</form>

			<div className="w-full flex flex-row items-center justify-center">
				<p className="text-gray-400 font-regular text-center text-md">
					Don’t have an account? Sign Up{" "}
					<span className="text-blue-400 hover:text-blue-500">
						<Link href="../login">here</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
