"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDataContext } from "@/app/context/GameDataProvider";
import { RoundButton } from "@/app/components/buttons/RoundButton";

interface ComponentProps {
	params: {
		idSubasta: string;
	};
}

function Page({ params: { idSubasta } }: ComponentProps) {
	const { data } = useDataContext();
	const router = useRouter();

	if (!data) {
		return <div className="mt-20 text-black">Cargando...</div>;
	}

	const subasta = data.subastas.otras.find(
		// @ts-ignore
		(subastaItem) => subastaItem.id === idSubasta
	);

	function fixImageUrl(url: string) {
		if (url.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	}

	return (
		<div className="flex flex-col items-center justify-center mt-20 pb-[160px]">
			<h1 className="text-black font-bold text-center text-2xl">
				{subasta.nombre}
			</h1>
			<div className="mt-10 rounded-md">
				<Image
					src={fixImageUrl(subasta.imagen)}
					width={500}
					height={500}
					alt="imagen subasta"
					className="rounded-md"
				/>
			</div>
			<div className="w-full max-w-lg px-4">
				<p className="text-center text-base font-normal mt-10">
					{subasta.descripcion +
						"    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores modi, commodi porro illo non odio velit debitis esse sequi laborum error itaque repellat, ipsum qui iste quaerat. Cum, neque nobis."}
				</p>
				<p className="text-center text-base font-semibold mt-10">
					Ganador actual
				</p>
				<p className="text-center text-base font-normal">{subasta.usuario}</p>
				<p className="text-center text-base font-normal">
					{`${subasta.monto} monedas`}
				</p>
				<p className="text-center text-lg font-medium text-blueEmmagini mt-16">
					Quiero ofertar
				</p>
				<div className="flex flex-col items-center">
					<input
						type="text"
						className="w-[330px] h-[39px] border-solid border-blue-300 border-2 rounded-[38px] mb-4"
					/>
					<RoundButton
						buttonClassName="bg-blueEmmagini w-[201px] h-[39px]"
						text="Ofertar"
						textClassName="text-center text-white"
					/>
				</div>
			</div>
		</div>
	);
}

export default Page;
