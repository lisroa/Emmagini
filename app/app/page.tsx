"use client";

import { useEffect } from "react";
import React from "react";
import { useDataContext } from "@/app/context/GameDataProvider";
import ImageBanner from "../components/home/ImageBanner";
import Table from "../components/home/Table";
import banner from "../../public/assets/bg/background.png";
import "@/app/components/styles/loader.css";

const Home = () => {
	const { isLoading, error, empresa, textos } = useDataContext();

	useEffect(() => {
		console.log("textos", textos);
	}, [textos]);

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
				<h1 className="text-blueEmmagini text-center mt-4 font-bold">
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
				image={banner}
				welcomText={empresa.header_1}
				title={empresa.header_2}
				subtitle={empresa.header_contenido}
				buttonText={textos.btn_header_mas}
			/>
			<Table />
		</main>
	);
};

export default Home;
