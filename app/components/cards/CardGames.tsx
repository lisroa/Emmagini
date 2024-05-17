
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RoundButton } from "../buttons/RoundButton";

// En el orden por el que se utilizan

interface CardGamesProps {
  image?: ReactNode;
  alt: string,
  title: string,
  description: string,
  subtitle: string,
  text: string,
  link?: string,
  buttonText: string, 
  altText: string,
  textSpan: string,
  titleClassName?: string,
  descriptionClassName?: string, 
  subtitleClassName?: string,
  textSpanClassName?: string,
  buttonClassName?: string;
  onClick?: () => void;
  textClassName?: string;
  type?: "button" | "submit" | "reset";
}

export const CardGames = ({
  link = "",
  image,
  alt,
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
  onClick,
}: CardGamesProps) => {
  return (
    <div
      className="w-full flex p-2 rounded-lg	bg-white w-[336.91] h-[204]">
      <div className="flex-none" >
        <Image src={image} alt={alt} className="w-[101px] h-[185px]" width={101} height={185}/>
        </div>

     <div className="flex-grow ml-4 flex flex-col justify-center">
        <h1 className={"text-black mb-2 mt-2 text-sm lg:text-base font-semibold"
          .concat(
            " ",
            titleClassName || ""
          )
        }>{title}</h1>
        <p
        className={"font-normal text-[10px] lg:text-xs text-black".concat(
          " ",
          descriptionClassName || ""
        )}
      >
        {description}
      </p>
        <div className="">
        <h2 className={"mb-2 mt-4 font-semibold text-xs  text-center text-black"
        
        .concat(
          " ",
          subtitleClassName || ""
        )}>{subtitle}</h2>
        <p className={"text-[10px] font-normal text-center text-black"
          .concat(
              " ",
              textClassName || ""
            )}>{text}</p>

              
              { altText && (
                  <p className="text-[10px]  text-center text-black">{altText}</p>
              )

              }

            <Link href={link}>
                 <button className={"mx-auto rounded-[50px] border-4 border-gray-200 "
               
               .concat(
                 " ",
                 buttonClassName || ""
               )} type={type} onClick={onClick}>{buttonText}</button>
                 </Link>
              <p className="text-[10px] text-center text-black mt-2">{textSpan}</p>
          </div>
        </div>

     
    </div>
  );
};

export default CardGames;

