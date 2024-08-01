import { Fragment, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { TodoEntry } from "./entry";
import { emptyItem, TodoItem } from "./types";

export const TodoList = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  return (
    <Grid
      container
      flexDirection="column"
      padding={theme => theme.spacing(1, 2)}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <TodoEntry
            index={index}
            item={item}
            setItem={newItem =>
              setItems(items =>
                items.map((item, ind) => (ind === index ? newItem : item))
              )
            }
            deleteItem={() =>
              setItems(items => items.filter((_, ind) => index !== ind))
            }
          />
          <Divider />
        </Fragment>
      ))}
      <Button
        variant="contained"
        onClick={() =>
          setItems(items => [...items, ...new Array(100).fill(emptyItem)])
        }
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
