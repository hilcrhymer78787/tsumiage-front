import { api } from "@/plugins/axios";
import { CmnRes } from "@/data/types/cmnRes";
import { CmnErr } from "@/data/types/cmnErr";
import { useSnackbar } from "@/data/common/useSnackbar";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { Success } from "../types/success";

type ApiReq = {};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;

export const useLogout = () => {
  const { setLoginInfo } = useLoginInfo();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const logout = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "api/user/auth/logout",
      method: "POST",
    })
      .then((res: ApiRes) => {
        setSnackbar("ログアウトしました");
        setLoginInfo(null);
        return res;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { logout, isLoading, error };
};
