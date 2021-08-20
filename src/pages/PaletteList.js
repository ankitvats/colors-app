import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import MiniPalette from "../components/MiniPalette";
import useStyles from "../styles/PaletteListStyles";

const PaletteList = ({ palettes, deletePalette }) => {
  const classes = useStyles();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId("");
  };

  const openDialog = React.useCallback((id) => {
    setOpenDeleteDialog(true);
    setDeleteId(id);
  }, []);

  const handleDelete = () => {
    deletePalette(deleteId);
    closeDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>Color App</h1>
          <Link to="/palette/new" className={classes.create}>
            Create Palette
          </Link>
        </nav>

        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette, i) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                openDialog={openDialog}
                key={palette.id}
                id={palette.id}
                {...palette}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default PaletteList;
