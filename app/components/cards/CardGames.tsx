// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RoundButton } from "../buttons/RoundButton";

// En el orden por el que se utilizan

interface CardGamesProps {
	cardClassName?: string;
	image?: ReactNode;
	imageContainer?: string;
	imageClassName?: string;
	alt?: string;
	title?: string;
	description?: string;
	subtitle?: string;
	text?: string;
	button?: boolean;
	buttonRouter?: boolean;
	buttonRouterClassName?: string;
	textRouterClassName?: string;
	div?: boolean;
	divClassName?: string;
	divText?: string;
	link?: string;
	buttonText?: string;
	altText?: string;
	textSpan?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	subtitleClassName?: string;
	textSpanClassName?: string;
	buttonClassName?: string;
	onClick?: () => void;
	textClassName?: string;
	type?: "button" | "submit" | "reset";
}

export const CardGames = ({
	cardClassName,
	link = "",
	button,
	buttonRouter,
	buttonRouterClassName,
	textRouterClassName,
	div,
	text,
	image,
	alt,
	title,
	description,
	subtitle,
	buttonText,
	divText,
	altText,
	textSpan,
	divClassName,
	titleClassName,
	descriptionClassName,
	imageContainer,
	imageClassName,
	subtitleClassName,
	textClassName,
	buttonClassName,
	type = "button",
	onClick,
}: CardGamesProps) => {
	return (
		<div
			className={" flex p-4 rounded-lg bg-white ".concat(
				" ",
				cardClassName || ""
			)}
		>
			<div className={"flex-none".concat(" ", imageContainer || "")}>
				<Image
					src={image}
					alt={alt}
					className={"".concat(" ", imageClassName || "")}
					width={200}
					height={185}
				/>
			</div>

			<div className="flex-grow ml-4 flex flex-col justify-center items-center">
				<h1
					className={"text-black mb-2 mt-2 text-sm lg:text-base font-semibold".concat(
						" ",
						titleClassName || ""
					)}
				>
					{title}
				</h1>
				<p
					className={"font-normal text-[10px] lg:text-xs text-black".concat(
						" ",
						descriptionClassName || ""
					)}
				>
					{description}
				</p>
				<div className="">
					<h2
						className={"mb-2 mt-4 font-semibold text-xs  text-center text-black".concat(
							" ",
							subtitleClassName || ""
						)}
					>
						{subtitle}
					</h2>
					<p
						className={"text-[10px] font-normal text-center text-black".concat(
							" ",
							textClassName || ""
						)}
					>
						{text}
					</p>

					{altText && (
						<p className="text-[10px]  text-center text-black">{altText}</p>
					)}

					{button && (
						<Link href={link}>
							<button
								className={"mx-auto rounded-[50px] border-4 border-gray-200 ".concat(
									" ",
									buttonClassName || ""
								)}
								type={type}
								onClick={onClick}
							>
								{buttonText}
							</button>
						</Link>
					)}
					{buttonRouter && (
						<button
							className={"mx-auto rounded-[50px] border-4 border-gray-200 ".concat(
								" ",
								buttonRouterClassName || ""
							)}
							type={type}
							onClick={onClick}
						>
							<p
								className={"align-middle text-center ".concat(
									" ",
									textRouterClassName || ""
								)}
							>
								{buttonText}
							</p>
						</button>
					)}
					{div && (
						<div
							className={"mx-auto rounded-[50px] border-4 border-gray-100 text-center".concat(
								" ",
								divClassName || ""
							)}
						>
							<p className="text-center">{divText}</p>
						</div>
					)}
					<p className="text-[10px] ml-10 text-black mt-2 align-middle text-center">
						{textSpan}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CardGames;
