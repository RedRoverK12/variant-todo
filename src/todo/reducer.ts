import { fields, match, TypeNames, variantModule, VariantOf } from "variant";
import { emptyItem, TodoItem } from "./types";

export type TodoState = TodoItem[];
export const initialTodoState: TodoState = [];

export const TodoAction = variantModule({
  userAddedItem: {},
  userToggledItem: fields<{ index: number }>(),
  userEditedItemTitle: fields<{ index: number; title: string | undefined }>(),
  userRemovedItem: fields<{ index: number }>(),
  userAddedNote: fields<{ itemIndex: number; contents: string }>(),
  userEditedNote: fields<{
    itemIndex: number;
    noteIndex: number;
    contents: string;
  }>(),
  userRemovedNote: fields<{ itemIndex: number; noteIndex: number }>(),
});
export type TodoAction<T extends TypeNames<typeof TodoAction> = undefined> =
  VariantOf<typeof TodoAction, T>;

export const todoReducer = (state: TodoState, action: TodoAction): TodoState =>
  match(action, {
    userAddedItem: () => [...state, emptyItem],
    userToggledItem: ({ index }) =>
      state.map((item, ind) =>
        ind === index ? { ...item, isDone: !item.isDone } : item
      ),
    userEditedItemTitle: ({ index, title }) =>
      state.map((item, ind) =>
        ind === index ? { ...item, title: title } : item
      ),
    userRemovedItem: ({ index }) => state.filter((_, ind) => ind !== index),
    userAddedNote: ({ itemIndex, contents }) =>
      state.map((item, ind) =>
        ind === itemIndex ? { ...item, notes: [...item.notes, contents] } : item
      ),
    userEditedNote: ({ itemIndex, noteIndex, contents }) =>
      state.map((item, ind) =>
        ind === itemIndex
          ? {
              ...item,
              notes: item.notes.map((note, ind) =>
                noteIndex === ind ? contents : note
              ),
            }
          : item
      ),
    userRemovedNote: ({ itemIndex, noteIndex }) =>
      state.map((item, ind) =>
        ind === itemIndex
          ? {
              ...item,
              notes: item.notes.filter((_, ind) => noteIndex !== ind),
            }
          : item
      ),
  });
