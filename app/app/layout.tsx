"use client";
/*import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GameDataProvider } from "../context/GameDataProvider";
import { FrontDataProvider } from "../context/FrontProvider";
//import { SeriesTrucoProvider } from "../context/truco/SeriesTrucoProvider";
import { AlbumDataProvider } from "../context/trivia/AlbumProvider";
import NavBar from "../components/home/NavBar";
import SideMenu from "../components/SideMenu/SideMenu";
import ButtonNav from "../components/home/ButtonNav";*/

// Crear una instancia de QueryClient
//const queryClient = new QueryClient();

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// TODO: Agregar código que verifique si estás logeado (tienes token y userId, puedes hacer una solicitud también). Si no estás logeado, te redirecciona al login, si estás logeado no hace nada.
	// TODO: Agregar SeriesTrucoProvider para que el truco funcione.
	return (
		/*<QueryClientProvider client={queryClient}>
			<FrontDataProvider>
				<GameDataProvider>
					<AlbumDataProvider>
						<main className="relative min-h-screen max-h-screen w-screen h-screen ">
							<NavBar />
							<SideMenu />
							{children}
						</main>
					</AlbumDataProvider>
				</GameDataProvider>
			</FrontDataProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>*/
		<p className="mt-20 text-black">
			Web en construccion. Disculpe las molestias
		</p>
	);
}
