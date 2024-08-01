import { Grid, Typography } from "@mui/material";
import { TodoList } from "./todo/list";

function App() {
  return (
    <Grid container flexDirection="row" width="100%" height="100vh" gap={2}>
      <Grid
        item
        container
        flex={1}
        flexDirection="column"
        alignContent="flex-end"
        padding={2}
      >
        <Typography variant="h3">Variant Todo List</Typography>
      </Grid>
      <Grid item flex={2} maxHeight="100vh" sx={{ overflowY: "scroll" }}>
        <TodoList />
      </Grid>
      <Grid item flex={1} padding={2} />
    </Grid>
  );
}

export default App;
