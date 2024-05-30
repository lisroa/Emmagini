import tester from "../../../public/assets/cards/trofeo.png";
import Image from "next/image";
import { ReactNode } from "react";

// Reemplazar las imagenes por las que vengan de la api y borrar el tester

// En el orden por el que se utilizan

interface PrizesCardProps {
	cardClassName?: string;
	image?: ReactNode;
	imageClassName?: string;
	title: string;
	titleClassName?: string;
	description: string;
	descriptionClassName?: string;
	textAlt1: string;
	textAlt2: string;
	textAlt1ClassName: string;
	textAlt2ClassName: string;
}

export const PrizesCard = ({
	image,
	title,
	description,
	textAlt1,
	textAlt2,
	cardClassName,
	imageClassName,
	titleClassName,
	descriptionClassName,
	textAlt1ClassName,
	textAlt2ClassName,
}: PrizesCardProps) => {
	return (
		<div
			className={"w-full flex p-2 rounded-lg bg-gray-50 mb-2".concat(
				"",
				cardClassName || ""
			)}
		>
			<div className="flex-none w-[101px] rounded-lg relative overflow-hidden ">
				<Image
					src={tester}
					alt="tester"
					className={"absolute  ".concat("", imageClassName || "")}
				/>
			</div>

			<div className="flex-grow ml-4 flex flex-col justify-center ">
				<h1
					className={"text-black mt-2 text-xs  font-semibold ".concat(
						" ",
						titleClassName || ""
					)}
				>
					{title}
				</h1>
				<p
					className={"font-normal text-[10px] text-black ".concat(
						" ",
						descriptionClassName || ""
					)}
				>
					{description}
				</p>

				<p
					className={"text-black font-semibold text-xs  ".concat(
						"",
						textAlt1ClassName || ""
					)}
				>
					{textAlt1}
				</p>

				<p
					className={"text-black text-[10px] font-normal ".concat(
						"",
						textAlt2ClassName || ""
					)}
				>
					{textAlt2}
				</p>
			</div>
		</div>
	);
};

export default PrizesCard;
