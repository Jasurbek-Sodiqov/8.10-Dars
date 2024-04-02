import { Paper, Stack } from "@mui/material";

const Message = ({ sender, text }: { sender?: boolean; text: string }) => {
  return (
    <Stack direction={sender ? "row-reverse" : "row"}>
      <Paper
        sx={{
          py: 1,
          px: 2,
          bgcolor: sender ? "primary.main" : "",
          color: sender ? "white" : "",
        }}
      >
        {text}
      </Paper>
    </Stack>
  );
};

export default Message;
