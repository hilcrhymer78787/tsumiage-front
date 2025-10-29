import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { useSnackbar } from "../common/useSnackbar";
type ApiReq = {};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;

export const useEmailValid = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const emailValid = async (id: string, hash: string) => {
    setError("");
    setIsLoading(true);
    return api({
      url: `/api/email/verify/${id}/${hash}`,
      method: "GET",
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
    emailValid,
    error,
    isLoading,
  };
};
