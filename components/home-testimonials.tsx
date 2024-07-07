import { HoverEffect } from "./ui/card-hover-effect";
export default function HomeTestimonials() {
  return (
    <div className="w-4/5 mx-auto px-8">
      <h1 className="text-6xl font-normal text-neutral-600 pt-16 dark:text-neutral-400">
        User Testimonials
      </h1>
      <HoverEffect items={testimonials} />
    </div>
  );
}
const testimonials = [
  {
    title: "Narayan Upadhyay",
    description:
      "Narayan Upadhyay is a software engineer with a passion for technology and innovation. He is currently working on TrackNGo, a comprehensive bus tracking app designed to streamline bus management. Narayan is an avid reader and enjoys exploring new technologies and learning about various aspects of software development.",
    link: "/about",
  },
  {
    title: "John Doe",
    description:
      "John Doe is a software engineer with a passion for technology and innovation. He is currently working on TrackNGo, a comprehensive bus tracking app designed to streamline bus management. John is an avid reader and enjoys exploring new technologies and learning about various aspects of software development.",
    link: "/about",
  },
  {
    title: "Jane Smith",
    description:
      "Jane Smith is a software engineer with a passion for technology and innovation. She is currently working on TrackNGo, a comprehensive bus tracking app designed to streamline bus management. Jane is an avid reader and enjoys exploring new technologies and learning about various aspects of software development.",
    link: "/about",
  },
];
