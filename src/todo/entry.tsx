import { Checkbox, Grid, IconButton, TextField } from "@mui/material";
import { TodoItem } from "./types";
import { Delete, Note } from "@mui/icons-material";
import { Dispatch, memo, useState } from "react";
import { TodoAction } from "./reducer";
import { NotesDialog } from "./notes-dialog";

export const TodoEntry: React.FC<{
  index: number;
  item: TodoItem;
  dispatch: Dispatch<TodoAction>;
}> = memo(({ index, item, dispatch }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Grid container alignItems="center" item width="100%">
        <Grid item>
          <Checkbox
            checked={item.isDone}
            onChange={() => dispatch({ type: "userToggledItem", index })}
          />
        </Grid>
        <Grid item flex={1}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder={`Item ${index + 1}`}
            value={item.title ?? ""}
            onChange={e =>
              dispatch({
                type: "userEditedItemTitle",
                index,
                title: e.target.value || undefined,
              })
            }
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => setDialogIsOpen(true)}>
            <Note />
          </IconButton>
          <IconButton
            onClick={() => dispatch({ type: "userRemovedItem", index })}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
      <NotesDialog
        isOpen={dialogIsOpen}
        itemTitle={item.title ?? `Item ${index + 1}`}
        itemIndex={index}
        notes={item.notes}
        onClose={() => setDialogIsOpen(false)}
        dispatch={dispatch}
      />
    </>
  );
});
