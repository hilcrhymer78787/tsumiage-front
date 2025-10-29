import { Alert } from "@mui/material";
const ErrTxt = ({ txt, p = 5 }: { txt?: string; p?: string | number }) => {
  if (!txt) return <></>;
  return (
    <Alert sx={{ p }} severity="error">
      {txt}
    </Alert>
  );
};
export default ErrTxt;
