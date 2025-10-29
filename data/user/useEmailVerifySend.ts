import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;

export const useEmailVerifySend = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const emailVerify = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/auth/user/auth/email/verify/send",
      method: "POST",
    })
      .then((res: ApiRes) => {
        setSuccessMsg(res.data.data.message);
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
    emailVerify,
    successMsg,
    error,
    isLoading,
  };
};
