import { HoverEffect } from "./ui/card-hover-effect";
export default function HomeFeatures() {
  return (
    <div className="w-4/5 mx-auto px-8">
      <h1 className="text-7xl font-normal text-neutral-600 dark:text-neutral-400">
        Key Features
      </h1>
      <HoverEffect items={projects} />
    </div>
  );
}
const projects = [
  {
    title: "Trip Scheduler",
    description:
      "Easily add trips according to your preferred timings, giving you flexibility and convenience in planning your travels.",
    link: "/trips/new",
  },
  {
    title: "Travel Options",
    description:
      "Enables the inclusion of any vehicle for travel, offering flexibility and a wider range of transportation choices.",
    link: "/vehicles/new",
  },
  {
    title: "Document Management",
    description:
      "Facilitates online storage for vehicle and driver documents, ensuring easy access and organization of important records.",
    link: "/dashboard",
  },
  {
    title: "Document Vault",
    description:
      "Securely upload and manage essential documents like licenses, insurance, and vehicle registrations, and many more for easy retrieval and organization.",
    link: "/dashboard",
  },
  {
    title: "Trip Sheet",
    description:
      "Allows users to download a sheet containing all added trips, facilitating easy access and organization of trip details.",
    link: "/trips/new",
  },
  {
    title: "Trip Organizer",
    description:
      "Empowers users to filter trips based on driver, timings, and vehicle details, optimizing planning and organization efficiency.",
    link: "/filter",
  },
];
