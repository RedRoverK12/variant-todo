import { emptyItem, TodoItem } from "./types";

export type TodoState = TodoItem[];
export const initialTodoState: TodoState = [];

export type TodoAction =
  | { type: "userAddedItem" }
  | { type: "userToggledItem"; index: number }
  | { type: "userEditedItemTitle"; index: number; title: string | undefined }
  | { type: "userRemovedItem"; index: number }
  | { type: "userAddedNote"; itemIndex: number; contents: string }
  | {
      type: "userEditedNote";
      itemIndex: number;
      noteIndex: number;
      contents: string;
    }
  | { type: "userRemovedNote"; itemIndex: number; noteIndex: number };

export const todoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "userAddedItem":
      return [...state, emptyItem];
    case "userToggledItem":
      return state.map((item, ind) =>
        ind === action.index ? { ...item, isDone: !item.isDone } : item
      );
    case "userEditedItemTitle":
      return state.map((item, ind) =>
        ind === action.index ? { ...item, title: action.title } : item
      );
    case "userRemovedItem":
      return state.filter((_, ind) => ind !== action.index);
    case "userAddedNote":
      return state.map((item, ind) =>
        ind === action.itemIndex
          ? { ...item, notes: [...item.notes, action.contents] }
          : item
      );
    case "userEditedNote":
      return state.map((item, ind) =>
        ind === action.itemIndex
          ? {
              ...item,
              notes: item.notes.map((note, ind) =>
                action.noteIndex === ind ? action.contents : note
              ),
            }
          : item
      );
    case "userRemovedNote":
      return state.map((item, ind) =>
        ind === action.itemIndex
          ? {
              ...item,
              notes: item.notes.filter((_, ind) => action.noteIndex !== ind),
            }
          : item
      );
  }
};
