import { atom } from "recoil";

export const loadingAtom = atom<string | null>({
    key: "laodingAtom",
    default: null
})