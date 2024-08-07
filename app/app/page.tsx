"use client";
import React from "react";
import { useDataContext } from "@/app/context/GameDataProvider";
import ImageBanner from "../components/home/ImageBanner";
import Table from "../components/home/Table";
import banner from "../../public/assets/bg/background.png";
import "@/app/components/styles/loader.css";

const Home = () => {
	const { isLoading, error } = useDataContext();

	if (isLoading) {
		return (
			<div className="mt-20 text-black">
				<div className="mt-96">
					<section className="dots-container">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</section>
					<h1 className="text-blueEmmagini text-center mt-4 font-semibold text-xl">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500 text-center mt-4">{error}</div>;
	}

	return (
		<>
			<ImageBanner
				image={banner}
				welcomText="Bienvenido a COPADO"
				title="¿QUERÉS MIRAR EL PARTIDO DESDE ADENTRO DE LA CANCHA?"
				subtitle="Entra a las subastas para participar"
				buttonText="VER MAS"
			/>
			<Table />
		</>
	);
};

export default Home;
