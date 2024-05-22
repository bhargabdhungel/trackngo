import { useRecoilValue } from "recoil";
import { testAtom } from "../atoms/test";

export const useData = () => {
  const test = useRecoilValue(testAtom);
  return test;
};
