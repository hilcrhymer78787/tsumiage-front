import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useSnackbar } from "../common/useSnackbar";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { LoginInfo } from "../types/loginInfo";
import { useLoginInfo } from "../common/useLoginInfo";

type ApiReq = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};
type ApiRes = CmnRes<LoginInfo>;
type ApiErr = CmnErr<{
  emailError?: string;
  passwordError?: string;
}>;

export const usePasswordReset = () => {
  const { errHandler } = useErrHandler();
  const { setLoginInfo } = useLoginInfo();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const passwordReset = async (data: ApiReq) => {
    setError("");
    setEmailError("");
    setPasswordError("");
    setIsLoading(true);

    return api({
      url: "/api/user/auth/password/reset",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        setSnackbar("パスワードを変更しました。");
        setLoginInfo(res.data.data);
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
    error,
    emailError,
    passwordError,
  };
};
