"use client";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";

const CountdownTimer = ({ duration, onTimeOut }) => {
	const [timeLeft, setTimeLeft] = useState(duration);
	const [percentage, setPercentage] = useState(100);

	useEffect(() => {
		const endTime = Date.now() + timeLeft * 1000;
		const interval = setInterval(() => {
			const now = Date.now();
			const remainingTime = Math.max(0, endTime - now);
			setTimeLeft(Math.ceil(remainingTime / 1000));
			setPercentage((remainingTime / (duration * 1000)) * 100);

			if (remainingTime <= 0) {
				clearInterval(interval);
				setPercentage(0);
				onTimeOut();
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft, duration]);

	return (
		<div className="flex items-center justify-center p-4">
			<div className="relative w-full max-w-lg h-6 border-2 border-gray-500 rounded-full overflow-hidden bg-gray-500">
				<div
					className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ease-linear"
					style={{ width: `${percentage}%` }}
				/>
				<div className="relative flex items-center justify-center h-full text-white font-bold">
					<FaRegClock size={18} className="text-white mr-2" />{" "}
					{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
				</div>
			</div>
		</div>
	);
};

export default CountdownTimer;
