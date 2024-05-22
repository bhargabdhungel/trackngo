import ModeToggle from "./toggle-theme";

export default function AppBar() {
  return (
    <header className="flex justify-between items-center h-16 px-4">
      <div>TrackNGo</div>
      <nav>
        <ul className="flex gap-4 items-center">
          <ModeToggle />
        </ul>
      </nav>
    </header>
  );
}
