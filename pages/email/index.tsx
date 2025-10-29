import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useEmailVerifyIdHash } from "@/data/user/useEmailVerifyIdHash";
import { Alert } from "@mui/material";
import { useBearerAuth } from "@/data/user/useBearerAuth";

const VerifyPage = () => {
  const { error, EmailVerifyIdHash } = useEmailVerifyIdHash();
  const { bearerAuth } = useBearerAuth();
  const router = useRouter();
  const id = useMemo(() => String(router.query.id), [router.query.id]);
  const hash = useMemo(() => String(router.query.hash), [router.query.hash]);

  useEffect(() => {
    const validateEmail = async () => {
      if (!id || !hash) return;
      const res = await EmailVerifyIdHash(id, hash);
      if (!res) return;
      await bearerAuth();
      router.push("/mypage");
    };

    validateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, hash]);

  if (!!error) return <Alert severity="error">{error}</Alert>;
  return <></>;
};

export default VerifyPage;
