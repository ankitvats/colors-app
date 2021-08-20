import React from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "../styles/NavbarStyles";
import "rc-slider/assets/index.css";

const Navbar = (props) => {
  const { level, changeLevel, handleChange, showingAllColors } = props;
  const classes = useStyles(props);
  const [format, setFormat] = React.useState("hex");
  const [open, setOpen] = React.useState(false);

  const handleSelect = ({ target }) => {
    setFormat(target.value);
    setOpen(true);
    handleChange(target.value);
  };

  const handleClose = () => setOpen(false);

  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">reactcolorpicker</Link>
      </div>
      {showingAllColors && (
        <div>
          <span className={classes.level}>Level: {level}</span>

          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select onChange={handleSelect} value={format}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </header>
  );
};

export default Navbar;
