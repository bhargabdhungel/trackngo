import ImageComponent from "next/image";
import { Document } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";

interface DocumentListProps {
    documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
    return (
        <div className="flex flex-wrap justify-start mx-20">
            {documents
                .filter(doc => doc.type !== "IMAGE")
                .map((doc, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center p-4 my-3 mx-4 sm:mx-10 border rounded-lg shadow-md hover:cursor-pointer hover:shadow-lg hover:shadow-white hover:bg-slate-900 w-full sm:w-60"
                        style={{ height: "330px", overflow: "hidden" }}
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
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
                            <Button className="mx-5">
                                <Link href={doc?.link}>View Document</Link>
                            </Button>
                        </div>
                    </div>
                ))}
        </div>
    );
}
