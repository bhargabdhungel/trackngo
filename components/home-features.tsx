import { HoverEffect } from "./ui/card-hover-effect";

// Real-Time Tracking
// Monitor trucks and drivers in real-time. Get instant updates on their location, speed, and status, ensuring that you always know where your assets are.

// Live GPS tracking
// Speed monitoring
// Status updates
// Geo-fencing alerts
// Trip Scheduling
// Easily plan and manage trips. Schedule routes, assign drivers, and optimize your fleet's efficiency with our intuitive scheduling tools.

// Route planning
// Driver assignment
// Trip optimization
// Automated notifications
// Driver Management
// Keep track of driver details and performance. Maintain comprehensive records and ensure compliance with our driver management features.

// Driver profiles
// Performance metrics
// Compliance tracking
// Incident reporting
// Document Management
// Securely store and manage all essential bus-related documents. Ensure easy access and compliance with our comprehensive document management system.

// Document storage and retrieval
// Compliance checks
// Expiry notifications
// Secure access controls
// Reporting
// Gain insights into your fleet's operations with our advanced reporting tools. Create detailed reports on bus usage, driver performance, and maintenance to make informed decisions.

// Customizable report generation
// Performance analytics
// Maintenance tracking
// Export options for data analysis
// Real-time Updates
// Stay informed with real-time updates on bus locations and statuses. Ensure operational efficiency with live tracking and instant alerts.

// Live bus tracking
// Status notifications
// Operational alerts
// Geo-fencing capabilities

export default function HomeFeatures() {
  return (
    <div className="w-4/5 mx-auto px-8">
      <h1 className="text-6xl font-normal text-neutral-600 dark:text-neutral-400">
        Key Features
      </h1>
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Real-Time Tracking",
    description:
      "Monitor truck and drivers in real-time. Get instant updates on their location, speed, and status, ensuring that you always know where your assets are.",
    link: "https://www.google.com",
  },
  {
    title: "Live GPS tracking",
    description: "Speed monitoring",
    link: "https://www.google.com",
  },
  {
    title: "Status updates",
    description: "Geo-fencing alerts",
    link: "https://www.google.com",
  },
  {
    title: "Trip Scheduling",
    description:
      "Easily plan and manage trips. Schedule routes, assign drivers, and optimize your fleet's efficiency with our intuitive scheduling tools.",
    link: "https://www.google.com",
  },
  {
    title: "Route planning",
    description: "Driver assignment",
    link: "https://www.google.com",
  },
  {
    title: "Trip optimization",
    description: "Automated notifications",
    link: "https://www.google.com",
  },
  {
    title: "Driver Management",
    description:
      "Keep track of driver details and performance. Maintain comprehensive records and ensure compliance with our driver management features.",
    link: "https://www.google.com",
  },
  {
    title: "Driver profiles",
    description: "Performance metrics",
    link: "https://www.google.com",
  },
  {
    title: "Compliance tracking",
    description: "Compliance tracking",
    link: "https://www.google.com",
  },
];
