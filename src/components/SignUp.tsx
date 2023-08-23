import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { userContext } from "../context";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  const { name, setName, email, setEmail, phone, setPhone } =
    useContext(userContext);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const isEmailValid = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const isPhoneValid = (phone: number) => {
    const pattern = /^\d{9,}$/;
    return pattern.test(phone.toString());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !isEmailValid(email) || !isPhoneValid(phone)) {
      if (!name) {
        toast.error("Please provide a name.");
      }
      if (!isEmailValid(email)) {
        setEmailError("Please provide a valid email address.");
      } else {
        setEmailError(null);
      }
      if (!isPhoneValid(phone)) {
        setPhoneError("Please provide a valid phone number.");
      } else {
        setPhoneError(null);
      }
      return;
    }

    localStorage.setItem(
      "loginItems",
      JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      })
    );
    navigate("/posts");
    setName("");
    setEmail("");
    setPhone(0);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="email"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              error={emailError !== null}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Phone"
              type="number"
              value={phone}
              onChange={(e) => {
                setPhone(parseInt(e.target.value));
                setPhoneError(null);
              }}
              error={phoneError !== null}
              helperText={phoneError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
        <ToastContainer />
      </Container>
    </>
  );
};

export default SignUp;
