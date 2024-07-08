"use client";
import React from "react";
import { GameDataProvider } from "../context/GameDataProvider";
import { FrontDataProvider } from "../context/FrontProvider";
import { SeriesTrucoProvider } from "../context/truco/SeriesTrucoProvider";
import { AlbumDataProvider } from "../context/trivia/AlbumProvider";
import NavBar from "../components/home/NavBar";
import SideMenu from "../components/SideMenu/SideMenu";
import ButtonNav from "../components/home/ButtonNav";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// TODO: Agregar codigo que checkee que estes logeado (tenes token y userId, podes hacer una pegada tambien). Si no estas logeado, te redirecciona al login, si estas logeado no hace nada.

	return (
		<FrontDataProvider>
			<GameDataProvider>
				<AlbumDataProvider>
					<SeriesTrucoProvider>
						<main className="relative min-h-screen max-h-screen w-screen h-screen ">
							<NavBar />
							<SideMenu />
							{children}
							<ButtonNav />
						</main>
					</SeriesTrucoProvider>
				</AlbumDataProvider>
			</GameDataProvider>
		</FrontDataProvider>
	);
}
