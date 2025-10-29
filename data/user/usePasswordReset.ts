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
}>;

export const usePasswordReset = () => {
  const { errHandler } = useErrHandler();
  const { setLoginInfo } = useLoginInfo();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validation = (data: ApiReq) => {
    let isError: boolean = false;
    setError("");
    if (data.password != data.password_confirmation) {
      setError("パスワードが一致しません");
      isError = true;
    }
    if (data.password.length < 8) {
      setError("パスワードは8桁以上で設定してください");
      isError = true;
    }
    return isError;
  };

  const passwordReset = async (data: ApiReq) => {
    if (validation(data)) return;
    setError("");
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
        errHandler(err, setError, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    passwordReset,
    isLoading,
    error,
  };
};
