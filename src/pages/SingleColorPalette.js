import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ColorBox from "../components/ColorBox";
import Navbar from "../components/Navbar";
import PaletteFooter from "../components/PaletteFooter";
import useStyles from "../styles/PaletteStyles";

const SingleColorPalette = ({ palette, colorId }) => {
  const classes = useStyles();
  const [colors, setColors] = useState([]);
  const [format, setFormat] = useState("hex");

  useEffect(() => {
    let colorArray = [];
    const allColors = palette.colors;
    for (let key in allColors) {
      colorArray = colorArray.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }

    setColors(colorArray.slice(1));
  }, [palette, colorId]);

  const changeFormat = (val) => setFormat(val);

  const colorBoxes = colors.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} showingAllColors={false} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${palette.id}`} className="back-button">
            Go Back
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;
