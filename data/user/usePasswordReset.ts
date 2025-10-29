// TODO
import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useSnackbar } from "../common/useSnackbar";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { Success } from "@/data/types/success";

type ApiReq = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr<{
  emailError?: string;
  passwordError?: string;
}>;

export const usePasswordReset = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const passwordReset = async (data: ApiReq) => {
    setError("");
    setEmailError("");
    setPasswordError("");
    setIsLoading(true);

    return api({
      url: "/api/password/reset",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        setSnackbar(res.data.data.message);
        setSuccessMsg(res.data.data.message);
        return res;
      })
      .catch((err: ApiErr) => {
        const emailErr = err.response?.data?.data?.emailError ?? "";
        const passwordErr = err.response?.data?.data?.passwordError ?? "";
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        if (!emailErr && !passwordErr) {
          errHandler(err, setError, true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    passwordReset,
    isLoading,
    successMsg,
    error,
    emailError,
    passwordError,
  };
};
