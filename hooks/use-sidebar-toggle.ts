import { atom, useRecoilState } from "recoil";

// Define the atom
const sidebarToggleState = atom({
  key: "sidebarToggleState",
  default: true,
});

// Hook to use the state and its updater
export const useSidebarToggle = () => {
  const [isOpen, setIsOpen] = useRecoilState(sidebarToggleState);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return {
    isOpen,
    setIsOpen: toggleSidebar,
  };
};
