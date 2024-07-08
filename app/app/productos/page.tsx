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
		<div className="pb-[10px]">
			<div>
				<h1 className="mt-20 text-black text-center font-bold text-2xl">
					Productos
				</h1>
			</div>
			{data && data.productos.mias && data.productos.mias.length > 0 && (
				<div className="w-[336px] lg:w-[1300px] h-auto lg:ml-24 mt-20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-20 mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
							{/*// @ts-ignore */}
							{data.productos.mias.map((producto) => (
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

			{data && data.productos.otras && data.productos.otras.length > 0 && (
				<div className="w-[336px] lg:w-[1300px] h-auto lg:mt-14 lg:ml-20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10 mb-32 mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
							{data &&
								data.productos.otras &&
								/*// @ts-ignore */
								data.productos.otras.map((producto) => (
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
											description={`${producto.descripcion}`}
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

export default Page;
