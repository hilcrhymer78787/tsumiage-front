import { atom, useRecoilState } from "recoil";
import { LoginInfo } from "@/data/types/loginInfo";

// HMR 対応: すでに存在する atom があれば使う
export const loginInfoAtom =
  (global as any).loginInfoAtom ??
  atom<LoginInfo | null>({
    key: "loginInfo",
    dangerouslyAllowMutability: true,
    default: null,
  });

// HMR 用に global に保持
if (process.env.NODE_ENV === "development") {
  (global as any).loginInfoAtom = loginInfoAtom;
}

export const useLoginInfo = () => {
  const [loginInfo, setLoginInfo] = useRecoilState<LoginInfo | null>(loginInfoAtom);
  return { loginInfo, setLoginInfo };
};
