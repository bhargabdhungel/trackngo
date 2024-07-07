import { HoverEffect } from "./ui/card-hover-effect";
export default function HomeStats() {
  return (
    <div className="w-4/5 mx-auto px-8">
      <h1 className="text-6xl font-normal text-neutral-600 pt-16 dark:text-neutral-400">
        Our Fleet Stats
      </h1>
      <HoverEffect items={projects} />
    </div>
  );
}
const projects = [
  {
    title: "Total Buses",
    description:
      "TrackNGo has a total of 150 buses, including both regular and special services.",
    link: "/vehicles/new",
  },
  {
    title: "Trips Completed",
    description:
      "TrackNGo has a total of 1,245 trips completed, covering a period of 12 months.",
    link: "/trips/new",
  },
  {
    title: "Active Drivers",
    description:
      "TrackNGo has a total of 85 active drivers, including both regular and special services.",
    link: "/vehicles/new",
  },
  {
    title: "On-time Delivery Rate",
    description:
      "TrackNGo has an on-time delivery rate of 92%, indicating that the app has successfully managed the bus fleet.",
    link: "/vehicles/new",
  },
  {
    title: "Comprehensive Statistics",
    description:
      "TrackNGo has provided more than 1203 detailed reports on bus usage and trip details, covering a period of 12 months.",
    link: "/vehicles/new",
  },
];
