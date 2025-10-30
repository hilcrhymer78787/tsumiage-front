import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CreateTask from "@/components/task/CreateTask";
import { NAV_WIDTH } from "@/layouts/default";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useMedia } from "@/data/media/useMedia";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskHeader = ({ apiTaskRead }: { apiTaskRead: () => void }) => {
  const router = useRouter();
  const { isPc } = useMedia();
  const [scrollY, setScrollY] = useState(0);
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const style = !scrollY
    ? {
        backgroundImage: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
      }
    : {};

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar style={style} position="fixed" sx={{ paddingLeft: isPc ? `${NAV_WIDTH}px` : 0 }}>
      <Container sx={{ p: "0 10px" }} maxWidth="lg">
        <Toolbar className="flexBetween" disableGutters>
          <IconButton onClick={() => router.push("/task/sort")}>
            <SwapVertIcon />
          </IconButton>
          <IconButton onClick={() => router.push("/task/trash")}>
            <DeleteIcon />
          </IconButton>
          <Box flex={1} />
          <Button onClick={() => setCreateTaskDialog(true)}>
            <AddIcon sx={{ marginTop: "-4px" }} color="primary" />
            <Typography>新規</Typography>
          </Button>
        </Toolbar>
      </Container>
      <Dialog open={createTaskDialog} onClose={() => setCreateTaskDialog(false)}>
        {createTaskDialog && (
          <CreateTask
            onCloseMyself={() => {
              setCreateTaskDialog(false);
              apiTaskRead();
            }}
            task={null}
          />
        )}
      </Dialog>
    </AppBar>
  );
};
export default TaskHeader;
