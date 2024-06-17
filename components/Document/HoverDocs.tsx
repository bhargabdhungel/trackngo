"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Document } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import Modal from "../Modal";

interface DocumentListProps {
  documents: Document[];
}

export function HoverDocs({ documents }: DocumentListProps) {
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
    <div className="w-4/5 sm:w-4/5 md:w-1/2 lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 items-center justify-center">
      {documents.map((doc, index) => (
        <div key={index} className="flex justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" className="mt-2">
                {doc.type}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold mt-1">Expires On:</h4>
                  <p className="text-sm">
                    {doc?.expiryDate ? (
                      <span className="mt-2">
                        {format(new Date(doc.expiryDate), "dd/MM/yy")}
                      </span>
                    ) : (
                      <span className="mt-2">N/A</span>
                    )}
                  </p>
                </div>
                <div>
                  <Button onClick={() => openModal(doc.link)}>View</Button>
                  <Button className="m-2" variant="outline">
                    Delete
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={currentImage}
      />
    </div>
  );
}
