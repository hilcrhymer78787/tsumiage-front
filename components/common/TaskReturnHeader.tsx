import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NAV_WIDTH } from "@/layouts/default";
import { useMedia } from "@/data/media/useMedia";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TaskReturnHeader = () => {
  const router = useRouter();
  const { isPc } = useMedia();
  const [scrollY, setScrollY] = useState(0);
  const style = {
    backgroundImage: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar
      style={!!!scrollY ? style : {}}
      position="fixed"
      sx={{ paddingLeft: isPc ? `${NAV_WIDTH}px` : 0 }}
    >
      <Container sx={{ p: "0 10px" }} maxWidth="lg">
        <Toolbar className="flexStart" disableGutters>
          <Button onClick={() => router.push("/task")}>
            <ArrowBackIcon />
            <Typography>戻る</Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TaskReturnHeader;
