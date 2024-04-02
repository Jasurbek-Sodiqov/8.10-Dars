import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { Google, Telegram } from "@mui/icons-material";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleProvider, auth, realDB } from "../firebase/firebase";
import { child, get, getDatabase, ref, set } from "firebase/database";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [check, setCheck] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //   ------
  const [formErr, setFormErr] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const [authConnect, setAuthConnect] = useState(false);
  const [warn, setWarn] = useState(false);
  const [errText, setErrText] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (check && mail && pass) {
      createUserWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          const id = mail.slice(0, mail.lastIndexOf("@"));
          const dbRef = ref(getDatabase());
          get(child(dbRef, `users/${id}`)).then((snap) => {
            if (!snap.exists()) {
              set(ref(realDB, `users/${id}`), { username: id });
            }
          });
          navigate("/");
        })
        .catch((e) => {
          setErrText(e.code);
          setWarn(true);
        });
    } else {
      setAuthErr(true);
    }
    setLoading(true);
  };

  const handleClose = (e: (e: boolean) => void) => {
    e(false);
  };
  const handleClick = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((e) => {
        const id = e.user.email?.slice(0, mail.lastIndexOf("@"));
        set(ref(realDB, "users/" + id), {
          username: id,
        });
        navigate("/");
      })
      .catch(() => {
        setErrText("hello");
        setWarn(true);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <Telegram />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              setLoading(false);
            }}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={check}
                      onChange={(e) => setCheck(!check)}
                      color="primary"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2, background: loading ? "#eee" : "" }}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <Typography
              component={"span"}
              sx={{ m: 1, textAlign: "center", display: "block" }}
            >
              or
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              sx={{ py: 1, mb: 1 }}
              onClick={handleClick}
            >
              <Google sx={{ mr: 1 }} />
              Sign up with Google
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={authConnect}
        autoHideDuration={6000}
        onClose={() => handleClose(setAuthConnect)}
      >
        <Alert
          onClose={() => handleClose(setAuthConnect)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Authenfication is successfully
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={warn}
        autoHideDuration={6000}
        onClose={() => handleClose(setWarn)}
      >
        <Alert
          onClose={() => handleClose(setWarn)}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errText}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={authErr}
        autoHideDuration={6000}
        onClose={() => handleClose(setAuthErr)}
      >
        <Alert
          onClose={() => handleClose(setAuthErr)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          the form doesn't filled out
        </Alert>
      </Snackbar>
    </>
  );
}
