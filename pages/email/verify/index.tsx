import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useEmailValid } from "@/data/user/useEmailValid";
import { Alert } from "@mui/material";

const VerifyPage = () => {
  const { error, emailValid } = useEmailValid();
  const router = useRouter();
  const id = useMemo(() => String(router.query.id), [router.query.id]);
  const hash = useMemo(() => String(router.query.hash), [router.query.hash]);

  useEffect(() => {
    const validateEmail = async () => {
      if (!id || !hash) return;
      const res = await emailValid(id, hash);
      if (!!res) router.push("/mypage");
    };

    validateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, hash]);

  if (!!error) return <Alert severity="error">{error}</Alert>;
  return <></>;
};

export default VerifyPage;
