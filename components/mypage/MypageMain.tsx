import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";

import CreateUser from "@/components/user/CreateUser";
import UserImg from "@/components/common/UserImg";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useLogout } from "@/data/user/useLogout";

const MypageMain = () => {
  const { loginInfo } = useLoginInfo();
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const onClickLogout = () => {
    if (!confirm("ログアウトしますか？")) return;
    logout();
  };

  const onClickEmailVerify = () => {
    if (!confirm("メール認証を行いますか？")) return;
    //
  };

  return (
    <>
      <Card>
        <CardHeader title="マイページ" />
        <CardContent>
          <Stack alignItems="flex-start" gap={3}>
            <Box>
              <ListItem sx={{ p: 0 }}>
                <ListItemAvatar>
                  <UserImg fileName={loginInfo?.user_img} size="70" />
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: "15px" }}
                  primary={loginInfo?.name}
                  secondary={loginInfo?.email}
                />
              </ListItem>
            </Box>
            {/* TODO */}
            {/* <Button onClick={onClickEmailVerify}>メール認証を行う</Button> */}
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={onClickLogout} color="inherit" variant="contained">
            ログアウト
          </Button>
          <Button onClick={() => setIsOpen(true)} variant="contained">
            編集
          </Button>
        </CardActions>
      </Card>
      {process.env.NODE_ENV === "development" && <pre>{JSON.stringify(loginInfo, null, 4)}</pre>}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        {isOpen && <CreateUser loginInfo={loginInfo} onCloseMyself={() => setIsOpen(false)} />}
      </Dialog>
    </>
  );
};
export default MypageMain;
