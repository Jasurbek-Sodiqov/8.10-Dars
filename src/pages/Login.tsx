import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Telegram } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleProvider, auth, realDB } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { child, getDatabase, ref, get, set } from "firebase/database";

export default function Login() {
  const [net, setNet] = useState(false);
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [warn, setWarn] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (_: React.FormEvent<HTMLFormElement>) => {
    if (checked) {
      if (mail && pass) {
        signInWithEmailAndPassword(auth, mail, pass)
          .then(() => {
            setPass("");
            setMail("");
            setOpen(true);
            navigate("/");
          })
          .catch(() => {
            setErr(true);
          });
      } else {
        setWarn(true);
      }
    } else {
      setWarn(true);
    }
    setLoading(false);
  };

  const handleClose = (e: (e: boolean) => void) => {
    e(false);
  };

  const handleWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider)
      .then(() => {
        const cutId = auth.currentUser?.email?.slice(0, -10);
        setOpen(true);
        navigate("/");
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${cutId}`)).then((snap) => {
          if (!snap.exists()) {
            set(ref(realDB, "users/" + cutId), {
              username: cutId,
            });
          }
        });
      })
      .catch(() => {
        setErr(true);
      });
  };
  useEffect(() => {
    setNet(!navigator.onLine);
  }, [navigator.onLine]);

  return (
    <>
      <Grid container component="main" sx={{ height: "100%" }}>
        <Grid
          item
          xs={false}
          sm={5}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <Telegram />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit(e);
              }}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                onChange={(e) => setMail(e.target.value)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={mail}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                value={"value"}
                color={loading ? "#eee" : "primary"}
                disabled={loading}
                control={
                  <Checkbox
                    value="remember"
                    onClick={() => setChecked(!checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />

              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: 0,
                  display: "block",
                  width: "100%",
                }}
              >
                <LoadingButton
                  loading={loading}
                  loadingIndicator="Loading…"
                  variant="contained"
                  sx={{ display: "block", width: "100%", py: 1, my: 1 }}
                >
                  Sign in
                </LoadingButton>
              </button>

              <Typography sx={{ display: "block", textAlign: "center", my: 1 }}>
                or
              </Typography>

              <Button
                variant="outlined"
                onClick={handleWithGoogle}
                sx={{ width: "100%", display: "block", mb: 1 }}
              >
                Sign in with Google
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link to={"#"}>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to={"/signup"}>Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => handleClose(setOpen)}
      >
        <Alert
          onClose={() => handleClose(setOpen)}
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
          the form is not filled out
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={err}
        autoHideDuration={6000}
        onClose={() => handleClose(setErr)}
      >
        <Alert
          onClose={() => handleClose(setErr)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          authenfication is not successfully
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={net}
        autoHideDuration={6000}
        onClose={() => handleClose(setNet)}
      >
        <Alert
          onClose={() => handleClose(setNet)}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          You must connect to internet
        </Alert>
      </Snackbar>
    </>
  );
}
