import Image from "next/image";
import Link from "next/link";

function CardHome({ text, imageCard, href, onClick }) {
  return (
    <Link href={href}>
        <div className="bg-white rounded-md shadow-md p-4 w-[233px] h-auto flex flex-col items-center cursor-pointer hover:shadow-  ml-[25px]" onClick={onClick}>
          <div className="relative h-40 w-full">
            <Image src={imageCard} alt="Card" layout="fill" objectFit="cover" className="w-full h-full"/>
          </div>
            <span className="text-black font-bold text-base leading-5 text-center mt-2">
              {text}
            </span>
      </div>
   </Link>
  );
}

export default CardHome;
