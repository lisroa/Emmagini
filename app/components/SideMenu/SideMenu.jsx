"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDataFrontContext } from "@/app/context/FrontProvider";
import { useAuthContext } from "@/app/context/AuthProvider";
import { useDataContext } from "@/app/context/GameDataProvider";
import ConfirmModal from "@/app/components/extras/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl";
import { BsGift, BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy, AiOutlineArrowRight } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { BadgeInfo } from "lucide-react";

const sideMenuVariants = {
	open: (menuWidth = 384) => ({
		clipPath: `circle(${menuWidth * 2 + 200}px at calc(100% - 40px) 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(30px at calc(100% - 40px) 40px)",
		transition: {
			delay: 0.2,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

const SideMenu = () => {
	const { textos } = useDataContext();
	const { sideMenuOpen, setSideMenuOpen, setModalOpen } = useDataFrontContext();
	const { lang } = useAuthContext();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		if (!router.events) return;
		const handleRouteChange = () => {
			setSideMenuOpen(false);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events, setSideMenuOpen]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sideMenuOpen && !event.target.closest(".side-menu")) {
				setSideMenuOpen(false);
			}
		};

		if (sideMenuOpen) {
			document.addEventListener("click", handleClickOutside);
		} else {
			document.removeEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [sideMenuOpen, setSideMenuOpen]);

	const logOut = useCallback(async () => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("user_id");
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/logout",
				{
					token: token,
					userid: userId,
					host: "demo14.emmagini.com",
					lang: lang,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);
			localStorage.removeItem("token");
			localStorage.removeItem("user_id");
			router.push("/auth/login");
			return response.data;
		} catch (error) {
			console.error("Error al cerrar sesion", error);
			throw error;
		}
	}, [router]);

	const handleLogOutClick = () => {
		setIsModalOpen(true);
	};

	const handleConfirm = async () => {
		setIsModalOpen(false);
		await logOut();
	};

	return (
		<>
			<AnimatePresence>
				{sideMenuOpen && (
					<motion.div
						className="side-menu bg-gray-600/50 backdrop-blur-sm min-h-screen w-96 fixed top-16 right-0 p-2 flex flex-col items-center z-50"
						initial="closed"
						animate="open"
						exit="closed"
						custom={384}
						variants={sideMenuVariants}
					>
						<div className="absolute top-4 right-4">
							<button
								className="rounded-full bg-red-500 mr-4"
								onClick={() => {
									setSideMenuOpen(false);
								}}
							>
								<SlClose className="text-white" size={35} />
							</button>
						</div>

						<div className="mt-20">
							<Link href="/app/premium">
								<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
									<div className="flex items-center">
										<AiOutlineTrophy className="mr-2" />
										<span className="text-black ml-2 font-bold text-sm">
											Premium
										</span>
									</div>
									<AiOutlineArrowRight />
								</button>
							</Link>
							<Link href="/app/subastas">
								<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
									<div className="flex items-center">
										<BsGift className="mr-2" />
										<span className="text-black ml-2 font-bold text-sm">
											Subastas
										</span>
									</div>
									<AiOutlineArrowRight />
								</button>
							</Link>
							<Link href="/app/productos">
								<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
									<div className="flex items-center">
										<BsCartCheck className="mr-2" />
										<span className="text-black ml-2 font-bold text-sm">
											Compras
										</span>
									</div>
									<AiOutlineArrowRight />
								</button>
							</Link>
							<Link href="/app">
								<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
									<div className="flex items-center">
										<FaRegUserCircle className="mr-2" />
										<span className="text-black ml-2 font-bold text-sm">
											Perfil
										</span>
									</div>
									<AiOutlineArrowRight />
								</button>
							</Link>
							<Link href="https://copado.club/tyc.php" target="_blank">
								<button className="flex items-center justify-between w-[323px] h-12 bg-white text-blueEmmagini mt-4 rounded-[50px] px-4">
									<div className="flex items-center">
										<BadgeInfo className="mr-2" />
										<span className="text-black ml-2 font-bold text-sm">
											Terminos y condiciones
										</span>
									</div>
									<AiOutlineArrowRight />
								</button>
							</Link>
						</div>

						<div className="mx-auto absolute bottom-28">
							<button
								className="w-[323px] h-12 bg-red mt-4 rounded-[50px] border-4 border-gray-500"
								onClick={handleLogOutClick}
							>
								<span className="text-base font-bold text-white">
									Cerrar sesión
								</span>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<ConfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleConfirm}
			/>
		</>
	);
};

export default SideMenu;
