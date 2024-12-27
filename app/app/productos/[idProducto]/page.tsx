"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/image";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import { BsCashCoin, BsCoin } from "react-icons/bs";
import "@/app/components/styles/loader.css";
import Modal from "@/app/components/extras/ModalMensajes";

interface ComponentProps {
	params: {
		idProducto: string;
	};
}

const fetchProduct = async (
	token: string,
	userId: string,
	idProducto: string
) => {
	const response = await axios.post(
		"https://backend.emmagini.com/api2/get_producto",
		{
			token,
			userid: userId,
			id: idProducto,
			host: "demo14.emmagini.com",
			callback: `https://demo14.emmagini.com/home.php#v=detalle-productos&id=${idProducto}`,
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

const purchaseProduct = async (
	token: string,
	userId: string,
	productId: string,
	price: number
) => {
	try {
		const response = await axios.post(
			"https://backend.emmagini.com/api2/producto_comprar",
			{
				q: productId,
				w: price,
				host: "demo14.emmagini.com",
				callback: `https://demo14.emmagini.com/home.php#v=detalle-productos&id=${productId}`,
				token,
				userid: userId,
				lang: "es",
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			}
		);

		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.mensaje || "Error al comprar el producto"
		);
	}
};

function Page({ params: { idProducto } }: ComponentProps) {
	const { token, userId } = useAuthContext();
	const { getAppData } = useDataContext();
	const router = useRouter();

	const { data, error, isLoading } = useQuery(
		["productData", token, userId, idProducto],
		() => fetchProduct(token, userId, idProducto)
	);

	const [modalMessage, setModalMessage] = useState<string | null>(null);
	const [hasPurchased, setHasPurchased] = useState(false);

	const handlePurchase = async () => {
		if (data?.content.solouno === "1" && hasPurchased) {
			setModalMessage("Solo puedes comprar este producto una vez.");
			return;
		}

		if (data?.content.tipo_pago === 1) {
			try {
				const result = await purchaseProduct(
					token,
					userId,
					idProducto,
					data.content.precio
				);
				if (result.error === "0") {
					setModalMessage("Muchas gracias por su compra");
					setHasPurchased(true);
					await getAppData();
				} else {
					setModalMessage(result.mensaje || "Error en la compra");
				}
			} catch (error) {
				setModalMessage("Error en la compra");
			}
		}
	};

	if (isLoading) {
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
					<h1 className="text-white text-center mt-4 font-semibold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center mt-20 text-red-500">
				<h1>Error al cargar el producto</h1>
			</div>
		);
	}

	const product = data?.content;

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	return (
		<>
			<h1 className="text-white font-bold text-center text-2xl mt-20">
				{product.nombre}
			</h1>
			<div className="flex flex-col md:flex-row items-center justify-center pb-[160px]">
				<div className="mt-10 rounded-md">
					<Image
						src={fixImageUrl(product.imagen)}
						width={500}
						height={500}
						alt="imagen producto"
						className="rounded-md"
					/>
				</div>
				<div className="w-full max-w-lg px-4">
					<p className="text-center text-base font-normal mt-10 text-white">
						{product.texto}
					</p>

					<p className="text-center text-base font-semibold mt-10 text-white">
						{product.tipo_pago === 1
							? "Compra con monedas"
							: "Compra con Mercado Pago"}
					</p>

					<div className="flex flex-row gap-3 items-center justify-center w-full h-[39px] bg-white rounded-full shadow-md border border-gray-200">
						<span className="text-blueEmmagini">{product.precio}</span>
						{product.tipo_pago === 1 ? (
							<BsCoin className="ml-2 text-orange-300" size={20} />
						) : (
							<BsCashCoin className="ml-2 text-green-400" size={20} />
						)}
					</div>

					<RoundButton
						buttonClassName="bg-blueEmmagini w-[201px] h-[39px] mt-6 mx-auto"
						text="Comprar"
						textClassName="text-center text-white"
						onClick={handlePurchase}
					/>

					<p className="text-center text-sm font-normal mt-4 text-white">
						Cierra el: {new Date(product.hasta).toLocaleDateString("es-ES")}
					</p>

					<p className="text-center text-sm font-normal text-white">
						Disponibles: {product.disponibles}
					</p>
				</div>
			</div>
			{modalMessage && (
				// @ts-ignore
				<Modal message={modalMessage} onClose={() => setModalMessage(null)} />
			)}
		</>
	);
}

export default Page;
