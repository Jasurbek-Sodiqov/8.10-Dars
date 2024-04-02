import {
  Avatar,
  Badge,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px white`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatItem = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <>
      <ListItem
        onClick={onClick}
        sx={{ overflowX: "hidden", cursor: "pointer" }}
      >
        <ListItem>
          <ListItemAvatar>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src="https://randomuser.me/api/portraits/men/33.jpg">
                <Person />
              </Avatar>
            </StyledBadge>
          </ListItemAvatar>
          <ListItemText sx={{ textTransform: "capital ize" }} primary={name} />
        </ListItem>
      </ListItem>
      <Divider></Divider>
    </>
  );
};

export default ChatItem;
