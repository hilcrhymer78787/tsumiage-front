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
type ApiErr = CmnErr<{
  emailError?: string;
}>;

export const usePasswordForgot = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const validation = (data: ApiReq) => {
    let isError = false;
    setEmailError("");
    if (!/.+@.+\..+/.test(data.email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    return isError;
  };
  const passwordForgot = async (data: ApiReq) => {
    setError("");
    setEmailError("");
    setIsLoading(true);
    if (validation(data)) return;
    if (process.env.NEXT_PUBLIC_BE === "laravel") {
      await api.get("/sanctum/csrf-cookie");
    }
    return api({
      url: "/api/user/auth/password/forgot",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        setSuccessMsg(res.data.data.message);
        return res;
      })
      .catch((err: ApiErr) => {
        const emailErr = err.response?.data?.data?.emailError ?? "";
        setEmailError(emailErr);
        if (!!emailErr) return;
        errHandler(err, setError, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    error,
    passwordForgot,
    successMsg,
    emailError,
    isLoading,
  };
};
