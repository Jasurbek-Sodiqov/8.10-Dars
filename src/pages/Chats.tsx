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
import { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { auth, realDB } from "../firebase/firebase";

import { v4 as uuid } from "uuid";
const Chats = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [activeUser, setActiveUser] = useState("");
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [actualUser, setActualUser] = useState(
    auth.currentUser?.email?.slice(0, auth.currentUser.email.lastIndexOf("@"))!
  );
  const handleSubmit = () => {
    if (text.length > 0) {
      const chat =
        activeUser > actualUser
          ? activeUser + actualUser
          : actualUser + activeUser;
      const chatRef = ref(realDB, `chats/${chat}/${uuid()}`);
      set(chatRef, {
        from: actualUser,
        text,
        time: Date.now(),
      }).then((e) => {
        console.log(e);
      });
      setText("");
    }
  };
  useEffect(() => {
    const starCountRef = ref(realDB, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(Object.keys(data).filter((e) => e !== actualUser));
    });
    setActualUser(
      auth.currentUser?.email?.slice(
        0,
        auth.currentUser.email.lastIndexOf("@")
      )!
    );
  }, []);

  const handleChatClick = (e: string) => {
    const chat = e > actualUser ? e + actualUser : actualUser + e;
    const chatRef = ref(realDB, `chats/${chat}`);
    onValue(chatRef, (snap) => {
      if (snap.val()) {
        const data = Object.values(snap.val()).sort(
          (a: any, b: any) => a.time - b.time
        );
        setMessages(data);
      }
    });
  };

  return (
    <Grid container>
      <Grid sm={3} xs={12}>
        {users.map((e, i) => (
          <ChatItem
            name={e}
            key={i}
            onClick={() => {
              setActiveUser(e);
              handleChatClick(e);
            }}
          />
        ))}
      </Grid>
      {activeUser.length > 0 && (
        <Grid sm={9} xs={12} height={"auto"} sx={{ overflowY: "auto" }}>
          <Paper
            sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}
          >
            <Paper
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
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
              <Typography
                component={"span"}
                sx={{ textTransform: "capitalize" }}
              >
                {activeUser}
              </Typography>
            </Paper>

            <Stack spacing={2} sx={{ p: 2, flex: 1 }} justifyContent={"end"}>
              {messages.length > 0 &&
                messages.map((e, i) => (
                  <Message
                    key={i}
                    sender={e.from === actualUser}
                    text={e.text}
                  />
                ))}
            </Stack>
            <Box display={"flex"} p={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Message"
                size="small"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <IconButton color="primary" onClick={handleSubmit}>
                <Send />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default Chats;

// {
//   users:{
//     username:{
//       ...chats_id:
//     }
//   }
//   chats:{
//     chat_id:{
//       id:{
//         from:""text
//       }
//     }
//   }
// }
