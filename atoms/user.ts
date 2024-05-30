import { User } from "@/lib/types";
import { atom } from "recoil";

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});
