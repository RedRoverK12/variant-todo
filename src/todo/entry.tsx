import { Checkbox, Grid, IconButton, TextField } from "@mui/material";
import { TodoItem } from "./types";
import { Delete } from "@mui/icons-material";
import { Dispatch, memo } from "react";
import { TodoAction } from "./reducer";

export const TodoEntry: React.FC<{
  index: number;
  item: TodoItem;
  dispatch: Dispatch<TodoAction>;
}> = memo(({ index, item, dispatch }) => {
  return (
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
        <IconButton
          onClick={() => dispatch({ type: "userRemovedItem", index })}
        >
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
});
