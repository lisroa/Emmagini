
import tester from "../../../public/assets/cards/imageCard.png"
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";


// En el orden por el que se utilizan

interface CardGamesProps {
  image?: ReactNode;
  title: string,
  description: string,
  subtitle: string,
  text: string,
  link: string,
  buttonText: string, 
  altText: string,
  textSpan: string,
  titleClassName: string,
  descriptionClassName: string, 
  subtitleClassName: string,
  textSpanClassName?: string,
  buttonClassName?: string;
  textClassName?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const CardGames = ({
  onClick,
  link,
  image,
  title,
  description,
  subtitle,
  text,
  buttonText,
  altText,
  textSpan,
  titleClassName,
  descriptionClassName,
  subtitleClassName,
  textClassName,
  buttonClassName,
  type = "button",
}: CardGamesProps) => {
  return (
    <div
      onClick={onClick}
      className="w-[340px] h-56 flex p-2 rounded-lg	 border-solid border-2 border-black ml-4 md:w-[400px] md:h-64 lg:w-[600px] lg:h-72">
      <div className="flex-none" >
        <Image src={tester} alt="tester" className="w-24 h-40 md:w-32 md:h-52 lg:w-48 lg:h-64" />
        </div>

     <div className="flex-grow ml-4 flex flex-col justify-center">
        <h1 className={"text-black mb-2 mt-2 text-xs md:text-sm lg:text-lg font-semibold"
          .concat(
            " ",
            titleClassName || ""
          )
        }>{title}</h1>
        <p
        className={"font-normal text-[10px] md:text-xs lg:text-sm text-black".concat(
          " ",
          descriptionClassName || ""
        )}
      >
        {description}
      </p>
        <div className="">
        <h2 className={"mb-2 mt-4 font-semibold text-xs md:text-sm lg:text-lg text-center text-black"
        
        .concat(
          " ",
          subtitleClassName || ""
        )}>{subtitle}</h2>
        <p className={"text-[10px] md:text-xs lg:text-base font-normal text-center text-black"
          .concat(
              " ",
              textClassName || ""
            )}>{text}</p>

              
              { altText && (
                  <p className="text-[10px] md:text-xs lg:text-sm text-center text-black">{altText}</p>
              )

              }

            <Link href={link}>
                 <button className={"mx-auto rounded-[50px] border-4 border-gray-200 lg:ml-14 lg:w-[280px] lg:mt-2"
               
               .concat(
                 " ",
                 buttonClassName || ""
               )} type={type}>{buttonText}</button>
                 </Link>
              <p className="text-[10px] md:text-xs lg:text-base text-center text-black lg:mt-4">{textSpan}</p>
          </div>
        </div>

     
    </div>
  );
};

export default CardGames;

