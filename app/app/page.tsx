"use client";

import { useEffect } from "react";
import React from "react";
import { useDataContext } from "@/app/context/GameDataProvider";
import ImageBanner from "../components/home/ImageBanner";
import Table from "../components/home/Table";
import banner from "../../public/assets/bg/background.png";
import "@/app/components/styles/loader.css";
import ButtonNav from "../components/home/ButtonNav";
import { BsGift } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";

const Home = () => {
	const { error, empresa, textos } = useDataContext();

	/*useEffect(() => {
		console.log("textos", textos);
	}, [textos]);*/

	if (!empresa && !textos) {
		return (
			<div className="mt-96">
				<section className="dots-container">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</section>
				<h1 className="text-white text-center mt-4 font-bold text-xl">
					CARGANDO
				</h1>
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500 text-center mt-4">{error}</div>;
	}

	return (
		<main>
			<ImageBanner
				image={empresa.header_imagen}
				welcomText={empresa.header_1}
				title={empresa.header_2}
				subtitle={empresa.header_contenido}
				buttonText={textos.btn_header_mas}
			/>
			<Table />
			<ButtonNav
				link1="/app/subastas"
				link2="/app/productos"
				link3="/app/premium"
				icon1={<BsGift size={18} className="text-white" />}
				icon2={<BsCartCheck size={18} className="text-white" />}
				icon3={<AiOutlineTrophy size={18} className="text-white" />}
				texto1={"Subastas"}
				texto2={"Productos"}
				texto3={"Premium"}
			/>
		</main>
	);
};

export default Home;
