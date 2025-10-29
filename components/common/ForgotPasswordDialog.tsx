import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import ErrTxt from "./ErrTxt";
import SendIcon from "@mui/icons-material/Send";

const ForgotPasswordDialog = ({
  successMsg,
  error,
  defaultEmail,
  emailError,
  passwordForgot,
  isLoading,
}: {
  successMsg: string;
  error: string;
  defaultEmail: string;
  emailError: string;
  passwordForgot: any;
  isLoading: boolean;
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const onClickCreate = () => passwordForgot({ email });
  return (
    <Card>
      <CardHeader title="パスワード再発行" />
      <CardContent sx={{ p: "30px 15px" }}>
        {!!successMsg ? (
          <Alert severity="success">{successMsg}</Alert>
        ) : (
          <TextField
            onKeyDown={(e) => {
              if (e?.key === "Enter") onClickCreate();
            }}
            disabled={isLoading}
            error={!!emailError}
            helperText={emailError}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            label="メールアドレス"
          />
        )}
        <ErrTxt txt={error} p="10px 5px 0" />
      </CardContent>

      {!successMsg && (
        <CardActions disableSpacing>
          <Box />
          <LoadingButton onClick={onClickCreate} variant="contained" loading={isLoading}>
            送信
            <SendIcon />
          </LoadingButton>
        </CardActions>
      )}
    </Card>
  );
};

export default ForgotPasswordDialog;
