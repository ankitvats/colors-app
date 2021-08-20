import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const PaletteMetaForm = ({ palettes, hideForm, handleSubmit }) => {
  const [stage, setStage] = React.useState("form");
  const [newPaletteName, setNewPaletteName] = React.useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
    return () => ValidatorForm.removeValidationRule("isPaletteNameUnique");
  }, [palettes]);

  const handlePaletteName = (e) => {
    setNewPaletteName(e.target.value);
  };

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  const savePalette = (emoji) => {
    setStage("");
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker title="Pick a Palette Emoji" onSelect={savePalette} />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for new beautiful palette. Make sure it's
              unique.
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              fullWidth
              margin="normal"
              value={newPaletteName}
              onChange={handlePaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a palette name", "Name already used"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
