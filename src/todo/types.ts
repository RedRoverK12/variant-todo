export type TodoItem = {
  isDone: boolean;
  title: string | undefined;
  notes: string[];
};

export const emptyItem: TodoItem = {
  isDone: false,
  title: undefined,
  notes: [],
};
