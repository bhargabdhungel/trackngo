"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";
import Modal from "../Modal";
import { DriverDocument } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area"
import { deleteDriverDocument } from "@/app/actions/doc/driver";
import { toast } from "@/components/ui/use-toast";

interface DocumentListProps {
  docs: DriverDocument[];
}

export function HoverDocs({ docs }: DocumentListProps) {
  const [documents, setDocuments] = useState<DriverDocument[]>(docs);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  async function handleDeleteDoc(id: number) {
    try {
      const response = await deleteDriverDocument(id);
      toast({
        title: response.message,
      })
      if(response.success) {
        setDocuments(documents.filter(doc => doc.id !== id));
      }
    } catch (error) {
      toast({
        title: "Failed to delete document",
      });
    }
  }

  return (
    <>
      <ScrollArea className="h-80 w-full rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-xl font-medium leading-none">Documents</h4>
          {documents.map((doc, index) => (
            <div key={index} className="flex justify-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" className="mt-2 w-full">
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
                      <Button
                        className="m-2" variant="outline"
                        onClick={() => { handleDeleteDoc(doc.id!) }}
                      >
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
      </ScrollArea>
    </>
  );
}
