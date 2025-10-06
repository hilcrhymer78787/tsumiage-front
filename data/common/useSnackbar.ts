// useSnackbar.ts
import { SyntheticEvent } from "react";
import { atom, useRecoilState } from "recoil";

export type SnackbarItem = {
  id: number;
  message: string;
  severity?: "error" | "success" | "info" | "warning";
};

// HMR 対応: すでに atom があれば再定義しない
export const snackbarListAtom =
  (global as any).snackbarListAtom ??
  atom<SnackbarItem[]>({
    key: "snackbarListAtom",
    dangerouslyAllowMutability: true,
    default: [],
  });

// HMR 用に global に保持
if (process.env.NODE_ENV === "development") {
  (global as any).snackbarListAtom = snackbarListAtom;
}

export const useSnackbar = () => {
  const [snackbars, setSnackbars] = useRecoilState<SnackbarItem[]>(snackbarListAtom);

  const setSnackbar = (msg: string, severity?: "error" | "success" | "info" | "warning") => {
    setSnackbars((prev) => [...prev, { id: Date.now(), message: msg, severity }]);
  };

  const handleClose = (id: number, _event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return; // 背景クリックで閉じない
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    snackbars,
    setSnackbar,
    handleClose,
  };
};
