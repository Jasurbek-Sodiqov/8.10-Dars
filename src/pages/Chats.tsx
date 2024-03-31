import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ChatItem from "../components/ChatItem";
import { ArrowBack, Send } from "@mui/icons-material";
import Message from "../components/Message";

const Chats = () => {
  return (
    <Grid container>
      <Grid sm={3}>
        <ChatItem />
      </Grid>
      <Grid sm={9}>
        <Paper
          sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}
        >
          <Paper
            sx={{ py: 1, px: 2, display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box>
              <IconButton
                color={"primary"}
                sx={{
                  display: {
                    sm: "none",
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
            </Box>
            <Typography component={"span"}>John</Typography>
          </Paper>

          <Stack spacing={2} sx={{ p: 2, flex: 1 }} justifyContent={"end"}>
            <Message sender={"me"} />
            <Message />
            <Message sender={"me"} />
            <Message />
          </Stack>
          <Box display={"flex"} p={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Message"
              size="small"
              variant="outlined"
            />
            <IconButton color="primary">
              <Send />
            </IconButton>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chats;
