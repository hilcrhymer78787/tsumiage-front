import { Alert, Box, Card, CardActions, CardHeader, Stack, TextField } from "@mui/material";

import { CardContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useCreateInvitation } from "@/data/invitation/useCreateInvitation";
import ErrTxt from "../common/ErrTxt";

const CreateFriend = () => {
  const { createInvitation, isLoading, emailError, message, setMessage, error } =
    useCreateInvitation();
  const [email, setEmail] = useState("");

  const onClickCreate = () => {
    createInvitation({ email });
  };

  const onClickReset = () => {
    setEmail("");
    setMessage("");
  };

  return (
    <Card>
      <CardHeader title="友達申請" />
      <CardContent sx={{ p: "30px 15px" }}>
        <Stack gap={2}>
          {!!message ? (
            <Alert severity="success">{message}</Alert>
          ) : (
            <TextField
              onKeyDown={(e) => {
                if (e?.key === "Enter") onClickCreate();
              }}
              error={!!emailError}
              helperText={emailError}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              label="メールアドレス"
            />
          )}
          <ErrTxt txt={error} p="10px 5px 0" />
        </Stack>
      </CardContent>

      <CardActions disableSpacing>
        <Box />
        {!!message ? (
          <LoadingButton
            onClick={onClickReset}
            color="inherit"
            variant="contained"
            loading={isLoading}
          >
            続けて申請
          </LoadingButton>
        ) : (
          <LoadingButton onClick={onClickCreate} variant="contained" loading={isLoading}>
            申請
            <SendIcon />
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};
export default CreateFriend;
