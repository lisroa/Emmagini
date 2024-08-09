"use client";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/context/GameDataProvider";
import CardGames from "@/app/components/cards/CardGames";

function Page() {
	const { data } = useDataContext();
	const router = useRouter();

	function fixImageUrl(url: string | undefined) {
		if (!url) {
			return "";
		}

		if (url.startsWith("//")) {
			return `https:${url}`;
		}

		return url;
	}

	const handleCardClick = (idProducto: string) => {
		router.push(`/app/productos/${idProducto}`);
	};

	return (
		<div className="pb-10 overflow-x-hidden">
			<div>
				<h1 className="mt-20 text-white text-center font-bold text-2xl">
					Productos
				</h1>
			</div>
			{data && data.productos.mias && data.productos.mias.length > 0 && (
				<div className="w-full max-w-screen-xl mx-auto mt-20 px-4 lg:px-8">
					<div className="container mx-auto py-8 mb-20 mt-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
							{data.productos.mias.map((producto: any) => (
								<div
									key={producto.id}
									className="flex justify-center w-full max-w-xs md:max-w-md lg:max-w-lg"
								>
									<CardGames
										cardClassName="drop-shadow-lg"
										imageContainer="flex justify-center items-center"
										imageClassName="w-full max-w-[191px] h-auto"
										image={fixImageUrl(producto.imagen)}
										alt={producto.nombre}
										altText={`Precio: ${producto.monto_coins}`}
										title={producto.nombre}
										description={`${producto.descripcion}`}
										buttonRouter={true}
										buttonRouterClassName="bg-blueEmmagini text-white w-full max-w-[209px] h-[36px] lg:w-[209px] lg:h-[36px]]"
										buttonText="Comprar"
										onClick={() => handleCardClick(producto.id)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{data && data.productos.otras && data.productos.otras.length > 0 && (
				<div className="w-full max-w-screen-xl mx-auto mt-14 px-4 lg:px-8">
					<div className="container mx-auto py-8 mb-32 mt-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
							{data.productos.otras.map((producto: any) => (
								<div
									key={producto.id}
									className="flex justify-center w-full max-w-xs md:max-w-md lg:max-w-lg"
								>
									<CardGames
										cardClassName="drop-shadow-lg"
										imageContainer="flex justify-center items-center"
										imageClassName="w-full max-w-[191px] h-auto"
										image={fixImageUrl(producto.imagen)}
										alt={producto.nombre}
										altText={`Precio: ${producto.monto_coins}`}
										title={producto.nombre}
										description={`${producto.descripcion}`}
										buttonRouter={true}
										buttonRouterClassName="bg-blueEmmagini text-white w-[100px] max-w-[209px] h-[36px] lg:w-[209px] lg:h-[36px]"
										buttonText="Comprar"
										onClick={() => handleCardClick(producto.id)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Page;

/*"use client";

import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/context/GameDataProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useQuery } from "react-query";
import CardGames from "@/app/components/cards/CardGames";
import axios from "axios";

const fetchProducts = async (token: string, userId: string) => {
	const response = await axios.post(
		"https://backend.emmagini.com/api2/get_productos",
		{
			token,
			userid: userId,
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

function Page() {
	//const { data: contextData } = useDataContext();
	const { token, userId } = useAuthContext();
	const router = useRouter();

	const { data, error, isLoading } = useQuery(
		["productsData", token, userId],
		() => fetchProducts(token, userId),
		{
			enabled: !!token && !!userId,
		}
	);

	function fixImageUrl(url: string | undefined) {
		if (!url) {
			return "";
		}

		if (url.startsWith("//")) {
			return `https:${url}`;
		}

		return url;
	}

	const handleCardClick = (idProducto: string) => {
		router.push(`/app/productos/${idProducto}`);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		// @ts-ignore
		return <p>Error loading products: {error.message}</p>;
	}

	return (
		<div className="pb-[10px]">
			<div>
				<h1 className="mt-20 text-white text-center font-bold text-2xl">
					Productos
				</h1>
			</div>
			{data && data.productos?.mias && data.productos.mias?.length > 0 && (
				<div className="w-[336px] lg:w-[1300px] h-auto lg:ml-24 mt-20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-20 mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
							{data.productos.mias.map((producto: any) => (
								<div
									key={producto.id}
									className="flex justify-center w-[300px] h-[185px] lg:w-[500px] lg:h-[214px]"
								>
									<CardGames
										cardClassName="drop-shadow-lg"
										imageContainer="flex justify-center items-center"
										imageClassName=" w-[91px] h-[155px] lg:w-[191px] h-[155px]"
										image={fixImageUrl(producto.imagen)}
										alt={producto.nombre}
										altText={`Precio: ${producto.monto_coins}`}
										title={producto.nombre}
										description={producto.descripcion}
										div={true}
										divText="Ofertar"
										divClassName="bg-blueEmmagini text-white w-[209px] h-[36px] align-middle text-center"
										onClick={() => handleCardClick(producto.id)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{data && data.productos?.otras && data.productos.otras.length > 0 && (
				<div className="w-[336px] lg:w-[1300px] h-auto lg:mt-14 lg:ml-20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
							{data.productos.otras.map((producto: any) => (
								<div
									key={producto.id}
									className="flex justify-center w-[300px] h-[185px] lg:w-[500px] lg:h-[214px]"
								>
									<CardGames
										cardClassName="drop-shadow-lg"
										imageContainer="flex justify-center items-center"
										imageClassName=" w-[91px] h-[155px] lg:w-[191px] h-[155px]"
										image={fixImageUrl(producto.imagen)}
										alt={producto.nombre}
										altText={`Precio: ${producto.monto_coins}`}
										title={producto.nombre}
										description={producto.descripcion}
										buttonRouter={true}
										buttonRouterClassName="bg-blueEmmagini text-white w-[160px] h-[36px] lg:w-[209px] h-[36px]"
										buttonText="Comprar"
										onClick={() => handleCardClick(producto.id)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Page; */
