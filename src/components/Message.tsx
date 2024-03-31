import { Paper, Stack } from "@mui/material";

const Message = ({ sender }: { sender?: string }) => {
  return (
    <Stack direction={sender === "me" ? "row-reverse" : "row"}>
      <Paper
        sx={{
          py: 1,
          px: 2,
          bgcolor: sender === "me" ? "primary.main" : "",
          color: sender === "me" ? "white" : "",
        }}
      >
        hello john
      </Paper>
    </Stack>
  );
};

export default Message;
