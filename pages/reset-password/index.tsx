import { useState, useMemo, FormEvent } from "react";
import { useRouter } from "next/router";
import { usePasswordReset } from "@/data/user/usePasswordReset";
import { TextField, Typography, Alert, Stack, Container, Card, CardHeader } from "@mui/material";
import { KeyboardEvent } from "react";
import { LoadingButton } from "@mui/lab";
import Center from "@/components/common/Center";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const { passwordReset, isLoading, error } = usePasswordReset();

  const token = useMemo(() => String(router.query.token), [router.query.token]);
  const email = useMemo(() => String(router.query.email), [router.query.email]);

  const handleSubmit = async () => {
    const res = await passwordReset({
      email,
      password,
      password_confirmation: passwordAgain,
      token,
    });
    if (!!res) router.push("/");
  };

  const onKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e?.key === "Enter") handleSubmit();
  };

  return (
    <Container maxWidth="xs">
      <Center minHeight="100vh" p="10px">
        <Card sx={{ width: "100%" }}>
          <CardHeader title="パスワードリセット" />
          <Stack gap={2} p={4}>
            <Typography>{email}</Typography>
            <TextField
              onKeyDown={onKeyDown}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              label="パスワード"
            />
            <TextField
              onKeyDown={onKeyDown}
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.currentTarget.value)}
              label="パスワード確認"
            />
            {!!error && <Alert severity="error">{error}</Alert>}
            <LoadingButton onClick={handleSubmit} variant="contained" loading={isLoading}>
              リセット
            </LoadingButton>
          </Stack>
        </Card>
      </Center>
    </Container>
  );
}
