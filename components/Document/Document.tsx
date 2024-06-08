import ImageComponent from "next/image";
import { Document } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { format } from "date-fns";
import Modal from "../Modal";
import { useState } from "react";

interface DocumentListProps {
    documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState("");

    const openModal = (imageSrc: string) => {
        setCurrentImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImage("");
    };

    return (
        <div className="flex flex-wrap justify-around mx-20">
            {documents
                .map((doc, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center p-4 my-3 mx-4 sm:mx-10 border rounded-lg shadow-md hover:cursor-pointer hover:shadow-lg hover:shadow-white hover:bg-slate-900 w-full sm:w-60"
                        style={{ height: "390px", overflow: "hidden" }}
                    >
                        <p className="sm:text-lg text-md font-semibold mb-2">{doc.type}</p>
                        <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
                            <ImageComponent
                                src={doc.link}
                                alt={`Document Image ${index}`}
                                layout="responsive"
                                width={250}
                                height={250}
                                className="object-contain rounded-lg shadow-md"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center p-2">
                            <Button className="mx-5" onClick={() => openModal(doc.link)}>
                                <span className="text-xs md:text-sm">View Document</span>
                            </Button>
                            {
                                doc?.expiryDate ? (
                                    <>
                                        <p className="z-10 text-center mt-2 mb-1">Expires</p>
                                        <hr className="border-t-2 border-gray-500 mx-20" />
                                        <p className="z-10 text-center mt-1">{format(new Date(doc.expiryDate), "dd/MM/yy")}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="z-10 text-center mt-2 mb-1">Expires</p>
                                        <hr className="border-t-2 border-gray-500 mx-20" />
                                        <p className="z-10 text-center mt-1">N/A</p>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ))}

            <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={currentImage} />

        </div>
    );
}
