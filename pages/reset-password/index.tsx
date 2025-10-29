import { useState, useMemo, FormEvent } from "react";
import { useRouter } from "next/router";
import { usePasswordReset } from "@/data/user/usePasswordReset";
import { Box, Button, TextField, Typography, Alert, CircularProgress, Stack } from "@mui/material";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { passwordReset, isLoading, successMsg, error } = usePasswordReset();

  const token = useMemo(() => String(router.query.token), [router.query.token]);
  const email = useMemo(() => String(router.query.email), [router.query.email]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    passwordReset({
      email,
      password,
      password_confirmation: passwordConfirmation,
      token,
    });
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

      <form onSubmit={handleSubmit}>
        <TextField
          label="新しいパスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="パスワード確認"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Box sx={{ mt: 2, position: "relative" }}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            リセット
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary.main",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>

      {successMsg && <Alert severity="success">{successMsg}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
