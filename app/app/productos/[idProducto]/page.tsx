"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";

interface ComponentProps {
	params: {
		idProducto: string;
	};
}

function Page({ params: { idProducto } }: ComponentProps) {
	const { data } = useDataContext();
	const router = useRouter();

	if (!data) {
		return <div className="mt-20 text-black">Cargando...</div>;
	}

	const product = data.productos.otras.find(
		// @ts-ignore
		(productoItem) => productoItem.id === idProducto
	);

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	return (
		<>
			<h1 className="text-black font-bold text-center text-2xl mt-20">
				{product.nombre}
			</h1>
			<div className="flex flex-col md:flex-row items-center justify-center pb-[160px]">
				<div className="mt-10 rounded-md">
					<Image
						src={fixImageUrl(product.imagen)}
						width={500}
						height={500}
						alt="imagen subasta"
						className="rounded-md"
					/>
				</div>
				<div className="w-full max-w-lg px-4">
					<p className="text-center text-base font-normal mt-10">
						{product.descripcion +
							"    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores modi, commodi porro illo non odio velit debitis esse sequi laborum error itaque repellat, ipsum qui iste quaerat. Cum, neque nobis."}
					</p>
					<p className="text-center text-base font-semibold mt-10">Precio</p>
					<p className="text-center text-base font-normal">
						{`${product.monto_coins} monedas`}
					</p>
					<RoundButton
						buttonClassName="bg-blueEmmagini w-[201px] h-[39px]"
						text="Comprar con monedas"
						textClassName="text-center text-white"
					/>
					<Link href="/app/productos">
						<RoundButton
							buttonClassName="bg-blueEmmagini w-[201px] h-[39px] mt-4"
							text="Volver"
							textClassName="text-center text-white"
						/>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Page;
