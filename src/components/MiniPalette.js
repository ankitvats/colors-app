import React from "react";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../styles/MiniPaletteStyles";

const MiniPalette = (props) => {
  const { colors, id, paletteName, emoji, openDialog } = props;
  const history = useHistory();
  const classes = useStyles();

  const miniColorBoxes = colors.map((color) => (
    <div
      key={color.name}
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
    />
  ));

  const deletePalette = (event) => {
    event.stopPropagation();
    openDialog(id);
  };

  const handleRoutes = () => history.push(`palette/${id}`);

  return (
    <div className={classes.root} onClick={handleRoutes}>
      <DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default React.memo(MiniPalette);
