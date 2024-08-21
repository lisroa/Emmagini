"use client";

import { useState } from "react";
import Image from "next/image";
import "@/app/components/styles/figuritas.css";
import tester from "@/./public/assets/tester.jpeg";

function page() {
	const [modalImage, setModalImage] = useState(null);

	const handleOpenModal = (src) => {
		setModalImage(src);
	};

	const handleCloseModal = () => {
		setModalImage(null);
	};

	return (
		<div className="w-[1000px]">
			<h2 className="text-white mt-20">Primero</h2>
			<div className=" mt-20 bg-gray-200 h-[400px]">
				<div className="grid grid-cols-3 gap-4 mt-10">
					<div className="bg-white h-40 mt-10">
						<button
							className="w-full h-full"
							onClick={() => handleOpenModal(tester)}
						></button>
					</div>
					<div className="bg-green-500 h-40 mt-10">
						<button
							className="w-full h-full"
							onClick={() => handleOpenModal(tester)}
						></button>
					</div>
					<div className="bg-red h-40 mt-10">
						<button
							className="w-full h-full"
							onClick={() => handleOpenModal(tester)}
						></button>
					</div>
					<div className="bg-yellow-500 h-40">
						<button
							className="w-full h-full"
							onClick={() => handleOpenModal(tester)}
						></button>
					</div>
					<div className="bg-purple-500 h-40">
						<button
							className="w-full h-full"
							onClick={() => handleOpenModal(tester)}
						></button>
					</div>
					<div className="bg-pink-500 h-40">
						<button
							className="w-full h-full"
							onClick={() => handleOpenModal(tester)}
						></button>
					</div>
				</div>
			</div>
			<h2 className="text-white mt-20">Segundo</h2>
			<div className="grid grid-cols-3 gap-4 mt-10">
				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="flex col-span-2">
					<div className="bg-gray-200 flex-1">
						<button
							className="w-full h-full"
							onClick={() => {
								console.log("click");
							}}
						>
							<Image
								src={tester}
								alt="Picture of the author"
								className="w-full h-full"
							/>
						</button>
					</div>
					<div className="bg-gray-200 flex-1">
						<button
							className="w-full h-full"
							onClick={() => {
								console.log("click");
							}}
						>
							<Image
								src={tester}
								alt="Picture of the author"
								className="w-full h-full"
							/>
						</button>
					</div>
				</div>

				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							className="w-full h-full"
						/>
					</button>
				</div>
			</div>
			<h2 className="text-white mt-20">tercero</h2>
			<div className="grid grid-cols-3 gap-0 p-0 mt-10 w-full">
				<div className="bg-blue-500 h-40">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-green-500 h-40">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-red h-40">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-yellow-500 h-40">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-purple-500 h-40">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-pink-500 h-40">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
			</div>
			<h2 className="text-white mt-20">cuarto</h2>
			<div className="grid grid-cols-3 grid-rows-2 gap-0 mt-10 mb-20">
				<div className="bg-gray-200 col-span-1 row-span-1">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200 col-span-1 row-span-1">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="bg-gray-200 col-span-1 row-span-1 ml-10 mb-2">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200 col-span-1 row-span-1">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="bg-gray-200 col-span-1 row-span-2 ">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="bg-gray-200 col-span-1 row-span-2 ml-10">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
			</div>
			<h2 className="text-white mt-20">quinto</h2>
			<div className="grid grid-cols-3 gap-4 mt-10">
				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="flex col-span-2">
					<div className="bg-gray-200 flex-1">
						<button
							className="w-full h-full"
							onClick={() => {
								console.log("click");
							}}
						>
							<Image
								src={tester}
								alt="Picture of the author"
								width={100}
								height={100}
								className="w-full h-full"
							/>
						</button>
					</div>
					<div className="bg-gray-200 flex-1">
						<button
							className="w-full h-full"
							onClick={() => {
								console.log("click");
							}}
						>
							<Image
								src={tester}
								alt="Picture of the author"
								width={100}
								height={100}
								className="w-full h-full"
							/>
						</button>
					</div>
				</div>

				<div className="bg-gray-200">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
			</div>
			<h2 className="text-white mt-20">sexto</h2>
			<div className="grid grid-cols-3 grid-rows-2 gap-0 mt-10 mb-20">
				<div className="bg-gray-200  col-span-1 row-span-1 mr-4 mb-2">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200  col-span-1 row-span-1">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="bg-gray-200  col-span-1 row-span-1">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
				<div className="bg-gray-200  col-span-1 row-span-1 mr-4">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="bg-gray-200 col-span-1 row-span-2 ">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>

				<div className="bg-gray-200 col-span-1 row-span-2">
					<button
						className="w-full h-full"
						onClick={() => {
							console.log("click");
						}}
					>
						<Image
							src={tester}
							alt="Picture of the author"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</button>
				</div>
			</div>

			{modalImage && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
					onClick={handleCloseModal}
				>
					<div className="bg-white p-4 rounded relative">
						<button
							className="absolute top-2 right-2 text-black"
							onClick={handleCloseModal}
						>
							&times;
						</button>
						<Image
							src={modalImage}
							alt="Imagen ampliada"
							width={500}
							height={500}
							className="object-contain"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default page;
