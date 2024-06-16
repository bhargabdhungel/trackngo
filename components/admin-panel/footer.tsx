import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Built on top of{" "}
          <Link
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline hover:underline-offset-4"
          >
            @shadcn/ui
          </Link>{" "}
          by{" "}
          <Link
            href="https://x.com/bhargabdhungel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline hover:underline-offset-4"
          >
            @bhargabdhungel
          </Link>{" "}
          <Link
            href="github.com/thergupta2001"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline hover:underline-offset-4"
          >
            @rohangupta
          </Link>
          {" and "}
          <Link
            href="https://x.com/bhargabdhungel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline hover:underline-offset-4"
          >
            @pryanshusingh
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/bhargabdhungel/trackngo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline hover:underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
