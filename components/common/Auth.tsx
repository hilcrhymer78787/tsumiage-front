import { Button, Card, CardActions, CardHeader, Container, Stack, TextField } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useTestAuth } from "@/data/user/useTestAuth";
import { useBasicAuth } from "@/data/user/useBasicAuth";
import RStack from "./RStack";
import Center from "./Center";
import ErrTxt from "./ErrTxt";
import { usePasswordForgot } from "@/data/user/usePasswordForgot";

const Auth = ({ setIsNew }: { setIsNew: Dispatch<SetStateAction<boolean>> }) => {
  const {
    basicAuth,
    isLoading: basicAuthLoading,
    message,
    emailError,
    passwordError,
  } = useBasicAuth();
  const { testAuth, isLoading: testAuthLoading } = useTestAuth();
  const { passwordForgot, isLoading: passwordForgotLoading } = usePasswordForgot();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    basicAuth({ email, password });
  };

  return (
    <Container maxWidth="xs">
      <Center minHeight="100vh" p="10px">
        <Card sx={{ width: "100%" }}>
          <CardHeader title="ログイン" />
          <form onSubmit={onSubmit}>
            <Stack gap={3} p={3}>
              <TextField
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                label="email"
                type="email"
              />
              <TextField
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                label="password"
                type="password"
              />
              <ErrTxt txt={message} p={0} />
              {/* TODO */}
              <RStack justifyContent="flex-end">
                <Button
                  onClick={() => {
                    if (!confirm(`${email}宛にパスワードリセットメールを送信しますか？`)) return;
                    passwordForgot({ email });
                  }}
                >
                  パスワードを忘れた場合
                </Button>
              </RStack>
              <RStack justifyContent="flex-end">
                <LoadingButton
                  color="inherit"
                  variant="contained"
                  onClick={testAuth}
                  loading={testAuthLoading}
                  disabled={basicAuthLoading}
                >
                  テストユーザーでログイン
                  <SendIcon />
                </LoadingButton>
              </RStack>
            </Stack>
            <CardActions>
              <Button onClick={() => setIsNew(true)} color="inherit" variant="contained">
                新規登録
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={basicAuthLoading}
                disabled={testAuthLoading}
              >
                ログイン
                <SendIcon />
              </LoadingButton>
            </CardActions>
          </form>
        </Card>
      </Center>
    </Container>
  );
};
export default Auth;
