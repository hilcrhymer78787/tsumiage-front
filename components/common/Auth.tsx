import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Dialog,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useTestAuth } from "@/data/user/useTestAuth";
import { useBasicAuth } from "@/data/user/useBasicAuth";
import RStack from "./RStack";
import Center from "./Center";
import ErrTxt from "./ErrTxt";
import { usePasswordForgot } from "@/data/user/usePasswordForgot";
import ForgotPasswordDialog from "@/components/common/ForgotPasswordDialog";

const Auth = ({ setIsNew }: { setIsNew: Dispatch<SetStateAction<boolean>> }) => {
  const { testAuth, isLoading: testAuthLoading } = useTestAuth();
  const {
    basicAuth,
    isLoading: basicAuthLoading,
    message,
    emailError,
    passwordError,
  } = useBasicAuth();
  const {
    error,
    emailError: passwordForgotEmailError,
    successMsg,
    passwordForgot,
    isLoading: passwordForgotLoading,
  } = usePasswordForgot();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

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
                label="メールアドレス"
                type="email"
              />
              <TextField
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                label="パスワード"
                type="password"
              />
              <ErrTxt txt={message} p={0} />
              <RStack justifyContent="flex-end">
                <Button onClick={() => setOpen(true)}>パスワードを忘れた場合</Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  {!!open && (
                    <ForgotPasswordDialog
                      passwordForgot={passwordForgot}
                      isLoading={passwordForgotLoading}
                      successMsg={successMsg}
                      error={error}
                      defaultEmail={email}
                      emailError={passwordForgotEmailError}
                    />
                  )}
                </Dialog>
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
