import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useMemo, useState } from "react";
import { Task } from "@/data/types/task";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {};
type ApiRes = CmnRes<{ message: string }>;
type ApiErr = CmnErr;
export const useReadTest = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const readTest = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/test",
      method: "GET",
    })
      .then((res: ApiRes) => {
        alert(res.data.data.message);
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
    readTest,
    error,
    isLoading,
  };
};
