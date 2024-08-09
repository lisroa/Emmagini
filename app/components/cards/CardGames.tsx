// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

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
	textSpanClassName,
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
		<div className={`flex p-4 rounded-lg bg-white ${cardClassName || ""}`}>
			<div className={`flex-none ${imageContainer || ""}`}>
				<Image
					src={image}
					alt={alt}
					className={`w-[100px] h-[90px] md:w-[150px] md:h-[135px] lg:w-[200px] lg:h-[185px] ${
						imageClassName || ""
					}`}
					width={200}
					height={185}
				/>
			</div>

			<div className="flex-grow ml-4 flex flex-col justify-center items-start">
				<h1
					className={`text-black mb-2 mt-2 text-sm md:text-base lg:text-lg font-semibold ${
						titleClassName || ""
					}`}
				>
					{title}
				</h1>
				<p
					className={`font-normal text-xs md:text-sm lg:text-base text-black ${
						descriptionClassName || ""
					}`}
				>
					{description}
				</p>
				<div className="mt-4">
					<h2
						className={`mb-2 font-semibold text-xs md:text-sm lg:text-base text-center text-black ${
							subtitleClassName || ""
						}`}
					>
						{subtitle}
					</h2>
					<p
						className={`text-xs md:text-sm lg:text-base font-normal text-center text-black ${
							textClassName || ""
						}`}
					>
						{text}
					</p>

					{altText && (
						<p className="text-xs md:text-sm lg:text-base text-center text-black">
							{altText}
						</p>
					)}

					{button && (
						<Link href={link}>
							<button
								className={`flex items-center justify-center mx-auto rounded-full border-4 border-gray-200 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 ${
									buttonClassName || ""
								}`}
								type={type}
								onClick={onClick}
							>
								{buttonText}
							</button>
						</Link>
					)}
					{buttonRouter && (
						<button
							className={`flex items-center justify-center mx-auto rounded-full border-4 border-gray-200 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 ${
								buttonRouterClassName || ""
							}`}
							type={type}
							onClick={onClick}
						>
							<p className={`text-center ${textRouterClassName || ""}`}>
								{buttonText}
							</p>
						</button>
					)}
					{div && (
						<div
							className={`flex items-center justify-center mx-auto rounded-full border-4 border-gray-100 text-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 ${
								divClassName || ""
							}`}
						>
							<p className="text-center">{divText}</p>
						</div>
					)}
					<p
						className={`text-xs md:text-sm lg:text-base ml-0 md:ml-4 text-black mt-2 text-center ${
							textSpanClassName || ""
						}`}
					>
						{textSpan}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CardGames;
