/*"use client";

import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import "@/app/components/styles/loader.css";
import "@/app/components/styles/figuritas.css";

interface ComponentProps {
	params: {
		idAlbum: string;
	};
}

function Page({ params: { idAlbum } }: ComponentProps) {
	const { token, userId } = useAuthContext();
	const [loading, setLoading] = useState(true);
	const [dataAlbum, setDataAlbum] = useState<any>(null);

	const getAlbumData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/get_album",
				{
					token: token,
					userid: userId,
					id: idAlbum,
					host: "demo5.emmagini.com",
					callback: "https://demo5.emmagini.com/home.php#v=inicio",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud del álbum:", error);
			throw error;
		}
	}, [token, userId, idAlbum]);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const albumResponse = await getAlbumData();

			albumResponse.content.paginas = albumResponse.content.paginas.map(
				(pagina: any) => {
					const parser = new DOMParser();
					const doc = parser.parseFromString(pagina.code, "text/html");
					const imgElements = doc.querySelectorAll("img");

					imgElements.forEach((img: HTMLImageElement) => {
						const imgId = img.id;
						const imgIndex = parseInt(imgId.replace("figu_", ""), 10);

						const imageUrls = pagina.figus.map((figu: any) => figu.path);

						if (imageUrls[imgIndex - 1]) {
							img.src = imageUrls[imgIndex - 1];

							const hasSticker = albumResponse.content.mias.find(
								(sticker: any) => {
									return sticker.id === imgId;
								}
							);

							console.log(hasSticker);
							if (!hasSticker) {
								img.classList.add("nola");
							}
						}
					});

					return {
						...pagina,
						code: doc.body.innerHTML,
					};
				}
			);

			setDataAlbum(albumResponse);

			setLoading(false);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
			setLoading(false);
		}
	}, [getAlbumData]);

	useEffect(() => {
		if (token && userId) {
			fetchData();
		}
	}, [fetchData, token, userId]);

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
					<h1 className="text-white text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	if (dataAlbum) {
		return (
			<div className="text-white mt-20">
				<h1 className="text-xl font-bold mb-4">{dataAlbum.nombre_album}</h1>
				{dataAlbum.content.paginas.map((pagina: any) => (
					<div key={pagina.id} className="page-container mb-8">
						<div
							className="page-content"
							dangerouslySetInnerHTML={{ __html: pagina.code }}
						/>
					</div>
				))}
			</div>
		);
	}

	return <div className="text-white mt-20">No se encontraron datos</div>;
}

export default Page; */

"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthProvider";
import "@/app/components/styles/loader.css";
import "@/app/components/styles/figuritas.css";
import tester from "@/./public/assets/tester.jpeg";

interface ComponentProps {
	params: {
		idAlbum: string;
	};
}

function Page({ params: { idAlbum } }: ComponentProps) {
	const { token, userId } = useAuthContext();
	const [loading, setLoading] = useState(true);
	const [modalImage, setModalImage] = useState(null);
	const [dataAlbum, setDataAlbum] = useState<any>(null);

	const getAlbumData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/get_album",
				{
					token: token,
					userid: userId,
					id: idAlbum,
					host: "demo5.emmagini.com",
					callback: "https://demo5.emmagini.com/home.php#v=inicio",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud del álbum:", error);
			throw error;
		}
	}, [token, userId, idAlbum]);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const albumResponse = await getAlbumData();

			setDataAlbum(albumResponse);

			setLoading(false);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
			setLoading(false);
		}
	}, [getAlbumData]);

	useEffect(() => {
		if (token && userId) {
			fetchData();
		}
	}, [fetchData, token, userId]);

	const handleOpenModal = (src: any) => {
		setModalImage(src);
	};

	const handleCloseModal = () => {
		setModalImage(null);
	};

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
					<h1 className="text-white text-center mt-4 font-bold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	if (dataAlbum) {
		return (
			<div className="text-white mt-20 flex flex-col items-center justify-center">
				<h1 className="text-xl font-bold mb-4">{dataAlbum.nombre_album}</h1>
				{dataAlbum.content.paginas.map((pagina: any) => (
					<div key={pagina.id} className=" mb-8 sm:w-[150px] md:w-[500px]">
						{pagina.template === "v2-1-1-1-1-1-1" ? (
							<div className="grid grid-cols-3 gap-4 h-full ">
								<div className="bg-white h-24">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "1")
															?.id
												)
													? "nola"
													: ""
											}`}
											id="pos 1"
										/>
									</button>
								</div>
								<div className="h-24 bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px]${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "2")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-24">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "3")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-24">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "4")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-24">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "5")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-24">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "6")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
							</div>
						) : pagina.template === "v2-1-2-1-1-1" ? (
							<div className="grid grid-cols-3 gap-4 mt-10">
								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "1")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="flex col-span-2">
									<div className="bg-white flex-1">
										<button
											className="w-full h-full"
											onClick={() =>
												handleOpenModal(
													pagina.figus.find((figu: any) => figu.pos === "2")
														?.path
												)
											}
										>
											<Image
												src={
													pagina.figus.find((figu: any) => figu.pos === "2")
														?.path
												}
												width={300}
												height={300}
												alt="Picture of the author"
												className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
													!dataAlbum.content.mias.find(
														(mia: any) =>
															mia.id ===
															pagina.figus.find((figu: any) => figu.pos === "2")
																?.id
													)
														? "nola"
														: ""
												}`}
											/>
										</button>
									</div>
									<div className="bg-white flex-1">
										<button
											className="w-full h-full"
											onClick={() =>
												handleOpenModal(
													pagina.figus.find((figu: any) => figu.pos === "3")
														?.path
												)
											}
										>
											<Image
												src={
													pagina.figus.find((figu: any) => figu.pos === "3")
														?.path
												}
												width={300}
												height={300}
												alt="Picture of the author"
												className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
													!dataAlbum.content.mias.find(
														(mia: any) =>
															mia.id ===
															pagina.figus.find((figu: any) => figu.pos === "3")
																?.id
													)
														? "nola"
														: ""
												}`}
											/>
										</button>
									</div>
								</div>

								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "4")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "5")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "6")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
							</div>
						) : pagina.template === "v2-6" ? (
							<div className="grid grid-cols-3 gap-0 p-0 mt-10 w-full">
								<div className="bg-white h-40">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full  ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "1")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-40">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full   ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "2")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-40">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full  ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "3")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-40">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full   ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "4")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-40">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full   ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "5")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white h-40">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full  ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "6")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
							</div>
						) : pagina.template === "v2-4-1-1" ? (
							<div className="grid grid-cols-3 grid-rows-2 gap-0 mt-10 mb-20">
								<div className="bg-white col-span-1 row-span-1">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "1")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white col-span-1 row-span-1">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "2")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="bg-white col-span-1 row-span-1 ml-4 mb-2">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "3")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white col-span-1 row-span-1">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "4")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="bg-white col-span-1 row-span-2 ">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "5")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="bg-white col-span-1 row-span-2 ml-4">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "6")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
							</div>
						) : pagina.template === "v2-1-1-1-2-1" ? (
							<div className="grid grid-cols-3 gap-4 mt-10">
								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "1")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "2")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "3")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="flex col-span-2">
									<div className="bg-white flex-1">
										<button
											className="w-full h-full"
											onClick={() =>
												handleOpenModal(
													pagina.figus.find((figu: any) => figu.pos === "4")
														?.path
												)
											}
										>
											<Image
												src={
													pagina.figus.find((figu: any) => figu.pos === "4")
														?.path
												}
												width={300}
												height={300}
												alt="Picture of the author"
												className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
													!dataAlbum.content.mias.find(
														(mia: any) =>
															mia.id ===
															pagina.figus.find((figu: any) => figu.pos === "4")
																?.id
													)
														? "nola"
														: ""
												}`}
											/>
										</button>
									</div>
									<div className="bg-white flex-1">
										<button
											className="w-full h-full"
											onClick={() =>
												handleOpenModal(
													pagina.figus.find((figu: any) => figu.pos === "5")
														?.path
												)
											}
										>
											<Image
												src={
													pagina.figus.find((figu: any) => figu.pos === "5")
														?.path
												}
												width={300}
												height={300}
												alt="Picture of the author"
												className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
													!dataAlbum.content.mias.find(
														(mia: any) =>
															mia.id ===
															pagina.figus.find((figu: any) => figu.pos === "5")
																?.id
													)
														? "nola"
														: ""
												}`}
											/>
										</button>
									</div>
								</div>

								<div className="bg-white">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "6")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
							</div>
						) : pagina.template === "v2-1-4-1" ? (
							<div className="grid grid-cols-3 grid-rows-2 gap-0 mt-10 mb-20">
								<div className="bg-white col-span-1 row-span-1 mr-4 mb-2">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "1")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "1")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white col-span-1 row-span-1">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "2")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "2")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="bg-white  col-span-1 row-span-1">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "3")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "3")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
								<div className="bg-white  col-span-1 row-span-1 mr-4">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "4")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "4")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="bg-white col-span-1 row-span-2 ">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "5")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "5")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>

								<div className="bg-white col-span-1 row-span-2">
									<button
										className="w-full h-full"
										onClick={() =>
											handleOpenModal(
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											)
										}
									>
										<Image
											src={
												pagina.figus.find((figu: any) => figu.pos === "6")?.path
											}
											width={300}
											height={300}
											alt="Picture of the author"
											className={`w-full h-full object-cover sm:w-[150px] md:w-[200px] ${
												!dataAlbum.content.mias.find(
													(mia: any) =>
														mia.id ===
														pagina.figus.find((figu: any) => figu.pos === "6")
															?.id
												)
													? "nola"
													: ""
											}`}
										/>
									</button>
								</div>
							</div>
						) : (
							<h1>Album no encontrado</h1>
						)}
					</div>
				))}
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
								width={350}
								height={350}
								className="object-contain"
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Page;
