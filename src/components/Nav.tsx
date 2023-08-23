import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { userContext } from "../context";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  navContainer: {
    borderRadius: "5px",
    padding: "0 5rem",
    [theme.breakpoints.down("lg")]: {
      padding: 0,
    },
  },
  navList: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    listStyleType: "none",
    marginBottom: "1rem",
    color: "blue",
  },
  navItems: {
    cursor: "pointer",
    fontSize: "large",
    fontWeight: "bolder",
    color: "#fff",
  },
  logoutBtn: {
    border: "2px solid pink",
    color: "#fff",
    padding: "3px 10px",
    borderRadius: "4px",
    margin: "0 2rem",
  },
}));
const Nav: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { active, storedEmail, storedName, storedPhone } =
    useContext(userContext);

  const handleNavigate = (value: string): void => {
    storedName && storedEmail && storedPhone
      ? navigate(value)
      : toast.error("Login to karna padega na meri jaan...");
  };
  const handleLogout = () => {
    localStorage.removeItem("loginItems");
    navigate("/");
  };
  return (
    <>
      {/* navbar */}
      <Container>
        <AppBar position="static" className={classes.navContainer}>
          <Toolbar className={classes.navList}>
            <Typography
              className={classes.navItems}
              onClick={() => {
                handleNavigate("/");
              }}
              style={{
                borderBottom: active === "home" ? "2px solid pink" : "none",
                display:
                  storedEmail || storedName || storedPhone ? "none" : "block",
              }}
            >
              Home
            </Typography>
            <Typography
              className={classes.navItems}
              onClick={() => {
                handleNavigate("/posts");
              }}
              style={{
                borderBottom: active === "posts" ? "2px solid pink" : "",
              }}
            >
              Posts
            </Typography>
            <Typography
              className={classes.navItems}
              onClick={() => {
                handleNavigate("/department");
              }}
              style={{
                borderBottom: active === "department" ? "2px solid pink" : "",
              }}
            >
              Department
            </Typography>
            <Typography
              className={`${classes.navItems} ${classes.logoutBtn}`}
              style={{
                display:
                  !storedName || !storedEmail || !storedPhone ? "none" : "",
              }}
              onClick={handleLogout}
            >
              LOG OUT
            </Typography>
          </Toolbar>
        </AppBar>
      </Container>
      {/* toast container */}
      <ToastContainer />
    </>
  );
};

export default Nav;
