import { useState, useMemo, FormEvent } from "react";
import { useRouter } from "next/router";
import { usePasswordReset } from "@/data/user/usePasswordReset";
import { Box, Button, TextField, Typography, Alert, CircularProgress, Stack } from "@mui/material";
import { KeyboardEvent } from "react";
import { LoadingButton } from "@mui/lab";

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
    <Stack
      gap={2}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        パスワードリセット
      </Typography>
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

      <LoadingButton onClick={handleSubmit} variant="contained" loading={isLoading}>
        リセット
      </LoadingButton>

      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
