import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import classNames from "classnames";
import useStyles from "../styles/ColorBoxStyles";

const ColorBox = (props) => {
  const { background, name, paletteId, id, showingFullPalette } = props;
  const classes = useStyles(props);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const changeCopyState = () => {
    setCopied(true);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
        />
        <div
          className={classNames(classes.copyMessage, {
            [classes.showMessage]: copied,
          })}
        >
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
