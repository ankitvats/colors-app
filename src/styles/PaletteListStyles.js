import { makeStyles } from "@material-ui/core/styles";
import sizes from "./sizes";
import bg from "./bg.svg";

export default makeStyles({
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out",
    },
  },
  root: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100vh",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#394bad",
    backgroundImage: `url(${bg})`,
    overflowY: "auto",
  },
  heading: {
    fontSize: "2rem",
    margin: "1rem 0",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "75%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    padding: "0 1rem",
    "& a": {
      color: "white",
    },
  },
  create: {
    [sizes.down("sm")]: {
      display: "none",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "block",
  },
});
