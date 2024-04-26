"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/navBar/nav_logo.png";
import logoCoin from "../../../public/assets/icons/coin.png";
import { CgMenuRound } from "react-icons/cg";
import { useDataFrontContext } from "../../context/FrontProvider";

const NavBar = () => {
  const { setSideMenuOpen } = useDataFrontContext();
  return (
    <div className="flex justify-between items-center fixed z-10 w-full h-16 py-5 px-8 text-sm font-light top-0 bg-blueEmmagini">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg text-white">
          <Link href="#">
            <Image src={logo} width={106} height={53} />
          </Link>
        </li>
      </ul>

      <div id="coins" className="flex items-center gap-2">
        <div className="w-28 h-11 bg-white rounded-3xl flex items-center justify-center">
          <Image
            className="hover:animate-pulse cursor-pointer"
            src={logoCoin}
            width={32}
            height={32}
          />

          <span className="text-black font-semibold text-base ml-2">500</span>
        </div>

        <button
          className="ml-8"
          onClick={() => {
            setSideMenuOpen(true);
          }}
        >
          <CgMenuRound size={40} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
