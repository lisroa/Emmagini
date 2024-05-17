"use client"

import Image from "next/image"
import { useState, useEffect, useMemo } from "react";
import {RoundButton} from "../../../components/buttons/RoundButton"
import {useJuegoTrucoDataContext} from "@/app/context/truco/JuegoTrucoProvider";
import table from "@/public/assets/truco/table.png"
import dorso1 from "@/public/assets/truco/dorso 1.png"
import dorso2 from "@/public/assets/truco/dorso 2.png"
import dorso3 from "@/public/assets/truco/dorso 3.png"


function Page () {

    const {infoJuegoTruco, catchActions, catchParam } = useJuegoTrucoDataContext();

   

    function fixImageUrl(url: string) {
        if (url.startsWith("//")) {
          return `https:${url}`;
        }
        return url;
      }

      const gameActions = useMemo(() => {
        return infoJuegoTruco?.acciones?.filter((buttonAction) => !(buttonAction.val === "abandono" || buttonAction.val === "irme")) || [];
      }, [infoJuegoTruco]);

      const leaveActions = useMemo(() => {
        return infoJuegoTruco?.acciones?.filter((buttonAction) => buttonAction.val === "abandono" || buttonAction.val === "irme") || [];
      }, [infoJuegoTruco])

    return (
      <div className="grid grid-cols-12 gap-5 pt-20 pb-5 w-screen h-screen overflow-hidden ">
        <div className="col-span-3 flex flex-col gap-5">
          <div className="flex justify-start items-center flex-col gap-5">
            {gameActions.map((actionButton) => (
                <RoundButton
                  buttonClassName="bg-blueEmmagini h-[32px] rounded-[11px] w-full"
                  text={actionButton.txt}
                  textClassName="text-white"
                  onClick={() => catchActions(actionButton.val)}
                />
            ))}
          </div>

          <div className="flex-1 flex justify-end items-center flex-col gap-5">
            {leaveActions.map((actionButton) => (
                <RoundButton
                  buttonClassName="bg-red h-[32px] rounded-[11px] w-full"
                  text={actionButton.txt}
                  textClassName="text-white"
                  onClick={() => catchActions(actionButton.val)}
                />
            ))}
          </div>
        </div>

      <div className="col-span-6 bg-gray-200 rounded-[11px] overflow-hidden p-5">
        {/* <Image src={table} alt="mesa truco" className="absolute" layout='fill' objectFit='contain'/> */}
        <div className="flex flex-col gap-5 flex-1 w-full h-full">
          <div className="w-full flex flex-row justify-center items-center gap-5">
            <Image src={dorso1}  className="w-[106px] h-[208px]" alt="dorso1"/>
            <Image src={dorso2}  className="w-[106px] h-[200px]" alt="dorso2"/>
            <Image src={dorso3}  className="w-[106px] h-[208px]" alt="dorso3"/>
          </div>

          <div className="flex-1 flex flex-row justify-center items-center gap-5">
            {infoJuegoTruco && infoJuegoTruco.mesa && infoJuegoTruco.mesa.map((naipe) => (
              <Image src={fixImageUrl(naipe.imagen)} width={90} height={108} className="w-[106px] h-[208px] ml-4" alt="naipe" key={naipe.id}/>
            ))}
          </div>

          <div className="w-full flex flex-row justify-center items-center gap-5">
            {infoJuegoTruco && infoJuegoTruco.mis_cartas && infoJuegoTruco.mis_cartas.map((naipe) => (
              <button onClick={() => catchParam("tirar",naipe.id_naipe)}><Image src={fixImageUrl(naipe.imagen)} width={106} height={208} className="w-[106px] h-[208px] ml-4" alt="naipe" key={naipe.id}/></button>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-3 flex flex-col gap-5">
        <div className="w-full min-h-[420px] max-h-full flex flex-col items-center justify-center bg-zinc-300 rounded-[20px] p-6"> 
          {infoJuegoTruco && infoJuegoTruco.chat && infoJuegoTruco.chat.map((text) => (
            <p className="text-black font-normal text-base">{text.mensaje}</p>
          ))}
        </div>
      </div>
    </div>
    
    )
}

export default Page;