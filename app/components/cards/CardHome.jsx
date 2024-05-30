import Image from "next/image";
import Link from "next/link";

function CardHome({ text, imageCard, href, onClick }) {
	return (
		<Link href={href}>
			<div
				className="bg-white rounded-md shadow-md p-4 w-[172.24px] h-[203.01px] lg:w-[233px] lg:h-auto flex flex-col items-center cursor-pointer lg:ml-[25px] drop-shadow-lg"
				onClick={onClick}
			>
				<div className="relative h-40 w-full">
					<Image
						src={imageCard}
						alt="Card"
						layout="fill"
						objectFit="cover"
						className="w-full h-full"
					/>
				</div>
				<span className="text-black font-bold text-base leading-5 text-center mt-2">
					{text}
				</span>
			</div>
		</Link>
	);
}

export default CardHome;
