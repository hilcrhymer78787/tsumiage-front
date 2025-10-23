import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useSnackbar } from "@/data/common/useSnackbar";
import { SyntheticEvent } from "react";

const SlideTransition = (props: SlideProps) => <Slide {...props} direction="left" />;

const MySnackbar = () => {
  const { snackbars, handleClose } = useSnackbar();

  // ✅ id 付きで呼べる共通ハンドラ
  const createHandleClose = (id: number) => (event?: SyntheticEvent | Event, reason?: string) =>
    handleClose(id, event, reason);

  return (
    <>
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          open
          autoHideDuration={3000}
          onClose={createHandleClose(snackbar.id)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={SlideTransition}
          sx={{ mt: `${index * 60}px`, transition: ".5s" }}
        >
          <Alert
            onClose={createHandleClose(snackbar.id)}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default MySnackbar;
