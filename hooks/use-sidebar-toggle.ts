import { atom, useRecoilState } from "recoil";

const sidebarToggleState = atom({
  key: "sidebarToggleState",
  default: true,
});

export const useSidebarToggle = () => {
  const [isOpen, setIsOpen] = useRecoilState(sidebarToggleState);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return {
    isOpen,
    setIsOpen: toggleSidebar,
  };
};
