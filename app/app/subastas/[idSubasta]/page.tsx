"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import axios from "axios";
import "../../../components/styles/loader.css";

interface ComponentProps {
	params: {
		idSubasta: string;
	};
}

const fetchAuctionDetails = async (
	token: string,
	userId: string,
	idSubasta: string
) => {
	const response = await axios.post(
		"https://backend.emmagini.com/api2/get_auction",
		{
			token,
			userid: userId,
			id: idSubasta,
			host: "demo25.emmagini.com",
			lang: "es",
		},
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
		}
	);
	return response.data;
};

const placeBid = async (
	token: string,
	userId: string,
	idSubasta: string,
	oferta: string
) => {
	try {
		const response = await axios.post(
			"https://backend.emmagini.com/api2/pujar",
			new URLSearchParams({
				q: idSubasta,
				w: oferta,
				host: "demo25.emmagini.com",
				callback:
					"https://demo25.emmagini.com/home.php#v=detalle-subastas&id=a0f94f4a-c050-11ee-bc84-ec15a2edbff6",
				token,
				userid: userId,
				lang: "es",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error al realizar la oferta:", error);
		throw error;
	}
};

function Page({ params: { idSubasta } }: ComponentProps) {
	const { token, userId } = useAuthContext();
	const { data, textos } = useDataContext();
	const [oferta, setOferta] = useState("");
	const [auctionDetails, setAuctionDetails] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		try {
			const data = await fetchAuctionDetails(token, userId, idSubasta);
			setAuctionDetails(data);
			setIsLoading(false);
		} catch (error) {
			console.error("Error al cargar los detalles de la subasta:", error);
			setError("Error al cargar los detalles de la subasta");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, userId, idSubasta]);

	const handleBid = async () => {
		if (oferta.trim()) {
			try {
				const response = await placeBid(token, userId, idSubasta, oferta);
				if (response.error === 0 && response.mensaje === "OK") {
					alert("Oferta realizada con éxito");
					setOferta("");
					setError(null);
				} else {
					setError(response.mensaje);
				}
			} catch (error) {
				setError("Error al realizar la oferta");
			}
		} else {
			alert("Por favor, ingresa una oferta");
		}
	};

	if (isLoading)
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

	if (error && !auctionDetails)
		return <div className="text-red-500 text-center mt-4">{error}</div>;

	if (!auctionDetails || !auctionDetails.content) {
		return (
			<div className="text-red-500 text-center mt-4">
				No se encontraron detalles de la subasta
			</div>
		);
	}

	const { descripcion, imagen, user, actual, nombre, fin, texto } =
		auctionDetails.content;

	function fixImageUrl(url: string | undefined) {
		if (!url) {
			return "";
		}

		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	return (
		<div className="lg:h-screen">
			<h3 className="text-black mt-32 text-center text-xl font-bold mb-6">
				{nombre}
			</h3>
			<div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1300px] lg:h-screen overflow-hidden p-2 items-center mx-auto pb-[190px] mt-8">
				<div className="flex flex-col lg:gap-5 w-full lg:w-[705px]">
					<Image
						src={fixImageUrl(imagen)}
						width={500}
						height={500}
						alt="imagen subasta"
						className="rounded-md w-full"
					/>
				</div>
				<div className="w-full lg:w-[537px] md:h-[542px] flex flex-col gap-5 pb-[80px]">
					<p
						className="text-center text-sm md:mt-12"
						dangerouslySetInnerHTML={{ __html: texto }}
					></p>
					<p className="text-center text-base font-semibold mt-4">
						Ganador actual: {user}
					</p>

					<p className="text-center text-base font-normal">
						{`${actual} monedas`}
					</p>
					<p className="text-center text-lg font-medium text-blueEmmagini mt-2">
						Quiero ofertar
					</p>
					<div className="flex flex-col items-center">
						<input
							type="text"
							className="w-[330px] h-[39px] border-solid border-blue-300 border-2 rounded-[38px]"
							value={oferta}
							onChange={(e) => setOferta(e.target.value)}
						/>
						{error && <p className="text-red mt-2">{error}</p>}
						<div className="w-[230px] h-[39px] mt-2">
							<RoundButton
								buttonClassName="bg-blueEmmagini h-full"
								text="Ofertar"
								textClassName="text-center text-white"
								onClick={handleBid}
							/>
						</div>
						<span className="mt-2 text-xs">
							{" "}
							{`${textos.subasta_finaliza}  ${fin}`}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
