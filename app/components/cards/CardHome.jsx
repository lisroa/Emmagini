import Image from "next/image";

function CardHome({ text, imageCard }) {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[256px] h-auto flex flex-col items-center cursor-pointer hover:shadow-">
      <div className="relative h-40 w-full">
        <Image src={imageCard} alt="Card" layout="fill" objectFit="cover" />
      </div>
      <span className="text-black font-bold text-base leading-5 text-center mt-2">
        {text}
      </span>
    </div>
  );
}

export default CardHome;
