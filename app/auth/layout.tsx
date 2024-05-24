"use client";

import Image from "next/image";
import CleanLocalStorageOnUnmount from "../app/truco/CleanLocalStorageOnUnmount";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="relative min-h-screen max-h-screen w-screen h-screen overscroll-none overflow-hidden">
			<div className="absolute inset-0 z-0">
				<Image
					className="object-center w-full h-full"
					src={"/assets/bg/background.png"}
					alt={"Homepage background"}
					layout="fill"
				/>
			</div>

			<div className="relative z-10 flex md:flex-row flex-col items-center justify-center w-full h-full">
				<div className="flex flex-col items-center justify-center md:w-5/12 md:h-full w-full h-2/6">
					<Image
						className="md:w-7/12 w-10/12 max-w-80"
						src={"/assets/brand/logo.png"}
						alt={"Emmagini Logo"}
						width={896}
						height={408}
					/>
				</div>

				<div className="flex flex-col items-center justify-center md:p-10 p-7 md:w-5/12 md:h-full md:max-h-xl w-full max-h-4/6 bg-white rounded-4xl shadow-lg overflow-auto">
					{children}
				</div>
			</div>
		</main>
	);
}
