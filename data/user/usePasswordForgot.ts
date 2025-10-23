import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { useSnackbar } from "../common/useSnackbar";
type ApiReq = {
  email: string;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;

export const usePasswordForgot = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const passwordForgot = async (data: ApiReq) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/auth/password/forgot",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    passwordForgot,
    error,
    isLoading,
  };
};
