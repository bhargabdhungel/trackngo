import React, { useEffect } from "react";
import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc }) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).id === "modal-overlay") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-screen max-h-screen">
                    <Image
                        src={imageSrc}
                        alt="Document Image"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                    />
                </div>
            </div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
                &times;
            </button>
        </div>
    );
};

export default Modal;
