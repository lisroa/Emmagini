"use client";
import "../styles/ruletaStyles.css";

import { useRef, useState } from "react";

function Ruleta() {
	const wheelRef = useRef(null);
	const [value, setValue] = useState(Math.ceil(Math.random() * 3600));

	const handleSpin = () => {
		if (wheelRef.current) {
			wheelRef.current.style.transform = `rotate(${value}deg)`;

			setValue(value + Math.ceil(Math.random() * 3600));
		}
	};

	return (
		<>
			<div className="container mt-20">
				<div className="spinBtn" onClick={handleSpin}>
					Spin
				</div>
				<div className="wheel" ref={wheelRef}>
					<div className="number" style={{ "--i": 1, "--clr": "#db7093" }}>
						<span>100</span>
					</div>
					<div className="number" style={{ "--i": 2, "--clr": "#20b2aa" }}>
						<span>100</span>
					</div>
					<div className="number" style={{ "--i": 3, "--clr": "#d63e92" }}>
						<span>100</span>
					</div>
					<div className="number" style={{ "--i": 4, "--clr": "#daa520" }}>
						<span>100</span>
					</div>
					<div className="number" style={{ "--i": 5, "--clr": "#ff340f" }}>
						<span>100</span>
					</div>
					<div className="number" style={{ "--i": 6, "--clr": "#ff7f50" }}>
						<span>100</span>
					</div>
					<div className="number" style={{ "--i": 7, "--clr": "#3cb371" }}>
						<span>100</span>
					</div>
					<div className="number" style={{ "--i": 8, "--clr": "#4169e1" }}>
						<span>100</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Ruleta;
