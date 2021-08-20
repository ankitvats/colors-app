import React, { useState } from "react";
import ColorBox from "../components/ColorBox";
import Navbar from "../components/Navbar";
import PaletteFooter from "../components/PaletteFooter";
import useStyles from "../styles/PaletteStyles";

const Palette = ({ palette }) => {
  const classes = useStyles();
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  const changeLevel = (level) => setLevel(level);
  const changeFormat = (val) => setFormat(val);

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.name}
      id={color.id}
      paletteId={palette.id}
      showingFullPalette
    />
  ));

  return (
    <>
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={changeLevel}
          handleChange={changeFormat}
          showingAllColors
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    </>
  );
};

export default Palette;
