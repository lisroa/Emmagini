"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import Modal from "@/app/components/extras/ModalMensajes";
import ButtonNav from "@/app/components/home/ButtonNav";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
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
			host: "demo14.emmagini.com",
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
				host: "demo14.emmagini.com",
				callback:
					"https://demo14.emmagini.com/home.php#v=detalle-subastas&id=a0f94f4a-c050-11ee-bc84-ec15a2edbff6",
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
	const router = useRouter();
	const { token, userId } = useAuthContext();
	const { data, textos, empresa } = useDataContext();
	const [oferta, setOferta] = useState("");
	const [auctionDetails, setAuctionDetails] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [modalMessage, setModalMessage] = useState<string | null>(null);

	useEffect(() => {
		const backgroundImage = empresa?.fondo
			? `https://backend.emmagini.com/uploads/${empresa.fondo}`
			: null;

		if (backgroundImage) {
			document.body.style.backgroundImage = `url(${backgroundImage})`;
			document.body.style.backgroundSize = "cover";
			document.body.style.backgroundPosition = "center";
			document.body.style.backgroundRepeat = "no-repeat";
		} else {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundColor = "white";
		}

		return () => {
			document.body.style.backgroundImage = "";
			document.body.style.backgroundColor = "white";
		};
	}, [empresa]);
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
					setModalMessage("Oferta realizada con éxito");
					setOferta("");
					setError(null);
				} else {
					setModalMessage(response.mensaje);
					setError(response.mensaje);
				}
			} catch (error) {
				setModalMessage("Error al realizar la oferta");
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

	const handleClickBack = () => {
		router.back();
	};

	return (
		<div className="lg:h-screen">
			<h3 className="text-white mt-32 text-center text-xl font-bold mb-6">
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
					<p className="text-center text-base font-semibold mt-4 text-white">
						Ganador actual: {user}
					</p>

					<p className="text-center text-base font-normal text-white">
						{`${actual} monedas`}
					</p>
					<p className="text-center text-lg font-medium text-blueEmmagini mt-2 text-white">
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
								buttonClassName="bg-blueEmmagini h-full w-full"
								text="Ofertar"
								textClassName="text-center text-white"
								onClick={handleBid}
							/>
						</div>
						<span className="mt-2 text-xs text-white">
							{" "}
							{`${textos.subasta_finaliza}  ${fin}`}
						</span>
					</div>
				</div>
			</div>

			{modalMessage && (
				<Modal
					message={modalMessage}
					onButtonClick={handleClickBack}
					buttonText="Volver"
				/>
			)}
			<ButtonNav
				link1="/app/subastas"
				link2="/app/productos"
				link3="/app/premium"
				icon1={<IoMdArrowRoundBack size={18} className="text-white" />}
				icon2={<BsCartCheck size={18} className="text-white" />}
				icon3={<AiOutlineTrophy size={18} className="text-white" />}
				texto1={"Volver"}
				texto2={"Productos"}
				texto3={"Premium"}
			/>
		</div>
	);
}

export default Page;
