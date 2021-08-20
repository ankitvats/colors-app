import React from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useStyles from "../styles/ColorPickerFormStyles";

const ColorPickerForm = (props) => {
  const classes = useStyles(props);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [newColorName, setNewColorName] = React.useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return props.colors.every(
        ({ color }) => color.toLowerCase() !== currentColor.toLowerCase()
      );
    });

    return () => {
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
    };
  }, [props.colors, currentColor]);

  const updateColor = (color) => {
    setCurrentColor(color.hex);
  };

  const handleColorName = (e) => {
    setNewColorName(e.target.value);
  };

  const handleSubmit = () => {
    const newColor = { color: currentColor, name: newColorName };
    props.addNewColor(newColor);
    setNewColorName("");
  };

  return (
    <div className={classes.root}>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          className={classes.colorNameInput}
          value={newColorName}
          variant="filled"
          placeholder="Color Name"
          margin="normal"
          onChange={handleColorName}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color must be unique",
          ]}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.addColor}
          disabled={props.paletteIsFull}
          style={{
            backgroundColor: props.paletteIsFull ? "grey" : currentColor,
          }}
        >
          {props.paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
