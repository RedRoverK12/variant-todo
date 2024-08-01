import { Checkbox, Grid, IconButton, TextField } from "@mui/material";
import { TodoItem } from "./types";
import { Delete } from "@mui/icons-material";
import { memo } from "react";

export const TodoEntry: React.FC<{
  index: number;
  item: TodoItem;
  setItem: (item: TodoItem) => void;
  deleteItem: () => void;
}> = memo(({ index, item, setItem, deleteItem }) => {
  return (
    <Grid container alignItems="center" item width="100%">
      <Grid item>
        <Checkbox
          checked={item.isDone}
          onChange={e => setItem({ ...item, isDone: e.target.checked })}
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
            setItem({ ...item, title: e.target.value || undefined })
          }
        />
      </Grid>
      <Grid item>
        <IconButton onClick={deleteItem}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
});
