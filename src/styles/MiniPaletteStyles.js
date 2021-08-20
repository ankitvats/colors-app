import { makeStyles } from "@material-ui/core/styles";
import sizes from "./sizes";

export default makeStyles({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    width: "31.333%",
    margin: "1%",
    display: "inline-block",
    float: "left",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1,
    },
    [sizes.down("lg")]: {
      width: "31.333%",
      margin: "1%",
    },
    [sizes.down("md")]: {
      width: "48%",
      margin: "1%",
    },
    [sizes.down("sm")]: {
      display: "inline-block",
      width: "98%",
      margin: "1%",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "100px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    float: "left",
  },
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "30px",
    height: "30px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "5px",
    zIndex: 10,
    opacity: 0,
    transition: "all 0.3s ease-in-out",
  },
});
