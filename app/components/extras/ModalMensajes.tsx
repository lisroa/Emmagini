import React from "react";

interface ModalProps {
	message: string;
	buttonText?: string;
	onButtonClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
	message,
	buttonText,
	onButtonClick,
}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
				<p className="text-black mb-4">{message}</p>
				<button
					onClick={onButtonClick}
					className="bg-blueEmmagini text-white rounded-md px-4 py-2"
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
};

export default Modal;
