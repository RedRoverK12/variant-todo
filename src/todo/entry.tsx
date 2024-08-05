import { Checkbox, Grid, IconButton, TextField } from "@mui/material";
import { Delete, Note } from "@mui/icons-material";
import { memo, useState } from "react";
import { NotesDialog } from "./notes-dialog";
import { useTodoDispatch, useTodoState } from "../store";

export const TodoEntry: React.FC<{
  index: number;
}> = memo(({ index }) => {
  const dispatch = useTodoDispatch();
  return (
    <Grid container alignItems="center" item width="100%">
      <Grid item>
        <IsDone index={index} />
      </Grid>
      <Grid item flex={1}>
        <Title index={index} />
      </Grid>
      <Grid item>
        <ViewNotes index={index} />
        <IconButton
          onClick={() => dispatch({ type: "userRemovedItem", index })}
        >
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
});

const IsDone: React.FC<{ index: number }> = ({ index }) => {
  const isDone = useTodoState(s => s[index].isDone);
  const dispatch = useTodoDispatch();
  return (
    <Checkbox
      checked={isDone}
      onChange={() => dispatch({ type: "userToggledItem", index })}
    />
  );
};

const Title: React.FC<{ index: number }> = ({ index }) => {
  const title = useTodoState(s => s[index].title ?? "");
  const dispatch = useTodoDispatch();
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder={`Item ${index + 1}`}
      value={title}
      onChange={e =>
        dispatch({
          type: "userEditedItemTitle",
          index,
          title: e.target.value || undefined,
        })
      }
    />
  );
};

const ViewNotes: React.FC<{ index: number }> = ({ index }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setDialogIsOpen(true)}>
        <Note />
      </IconButton>
      <NotesDialog
        isOpen={dialogIsOpen}
        itemIndex={index}
        onClose={() => setDialogIsOpen(false)}
      />
    </>
  );
};
