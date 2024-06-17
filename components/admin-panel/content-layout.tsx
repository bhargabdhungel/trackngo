import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <Navbar title={title} />
      <div className="container grow">{children}</div>
    </div>
  );
}
