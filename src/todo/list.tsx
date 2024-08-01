import { Fragment, useReducer } from "react";
import { Box, Button, Grid } from "@mui/material";
import { TodoEntry } from "./entry";
import { initialTodoState, todoReducer } from "./reducer";

export const TodoList = () => {
  const [items, dispatch] = useReducer(todoReducer, initialTodoState);
  return (
    <Grid
      container
      flexDirection="column"
      padding={theme => theme.spacing(1, 2)}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <TodoEntry index={index} item={item} dispatch={dispatch} />
          <Divider />
        </Fragment>
      ))}
      <Button
        variant="contained"
        onClick={() => dispatch({ type: "userAddedItem" })}
      >
        Add Item
      </Button>
    </Grid>
  );
};

const Divider: React.FC = () => (
  <Box
    margin={theme => theme.spacing(1.5, 0)}
    sx={{ height: "1px", backgroundColor: "darkgray" }}
  />
);
