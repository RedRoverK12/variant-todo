export type TodoItem = {
  isDone: boolean;
  title: string | undefined;
};

export const emptyItem: TodoItem = {
  isDone: false,
  title: undefined,
};
