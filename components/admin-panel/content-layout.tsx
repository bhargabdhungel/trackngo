import { ScrollArea } from "../ui/scroll-area";
import { Navbar } from "./navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <Navbar title={title} />
      <ScrollArea className="container h-[calc(100vh-112px)]">
        {children}
      </ScrollArea>
    </div>
  );
}
