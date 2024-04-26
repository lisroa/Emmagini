import Image from "next/image";

function ImageBanner(props) {
  return (
    <div className="relative overflow-hidden mt-16">
      <div className="absolute inset-0">
        <Image src={props.image} alt="Banner" layout="fill" objectFit="cover" />
      </div>
      <div className="relative container mx-auto px-4 py-16 text-white">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-8 mb-2 md:mb-4">
            {props.welcomText}
          </h3>
          <h1 className="font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-10 mb-2 md:mb-4">
            {props.title}
          </h1>
          <h3 className="font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl leading-8 mt-2 md:mt-4 mb-4">
            {props.subtitle}
          </h3>
          <button className="w-full sm:w-[323px] h-12 bg-blueEmmagini mt-4 rounded-[50px] border-4 border-gray-500 hover:bg-sky-700">
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageBanner;
