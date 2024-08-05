import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, useState } from "react";
import { TodoAction } from "./reducer";

export const NotesDialog: React.FC<{
  isOpen: boolean;
  itemTitle: string;
  itemIndex: number;
  notes: string[];
  onClose: () => void;
  dispatch: Dispatch<TodoAction>;
}> = ({ isOpen, itemTitle, itemIndex, notes, onClose, dispatch }) => {
  const [noteIndex, setNoteIndex] = useState<number>();
  const [showNewNote, setShowNewNote] = useState(false);
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      {noteIndex !== undefined ? (
        <ShowNote
          itemTitle={itemTitle}
          itemIndex={itemIndex}
          existingNote={notes[noteIndex]}
          noteIndex={noteIndex}
          goBack={() => setNoteIndex(undefined)}
          dispatch={dispatch}
        />
      ) : showNewNote ? (
        <ShowNote
          itemTitle={itemTitle}
          itemIndex={itemIndex}
          goBack={() => setShowNewNote(false)}
          dispatch={dispatch}
        />
      ) : (
        <PickNote
          itemTitle={itemTitle}
          notes={notes}
          goToShowNote={ind => setNoteIndex(ind)}
          goToNewNote={() => setShowNewNote(true)}
        />
      )}
    </Dialog>
  );
};

const PickNote: React.FC<{
  itemTitle: string;
  notes: string[];
  goToShowNote: (index: number) => void;
  goToNewNote: () => void;
}> = ({ itemTitle, notes, goToShowNote, goToNewNote }) => (
  <>
    <DialogTitle>{`Notes for ${itemTitle}`}</DialogTitle>
    <DialogContent>
      <Grid container flexDirection="column" gap={2}>
        {notes.map((note, index) => (
          <Grid
            container
            item
            flexDirection="row"
            alignItems="center"
            key={index}
            wrap="nowrap"
          >
            <Grid item flex={1} minWidth={0}>
              <Typography
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {note}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => goToShowNote(index)}>Edit</Button>
            </Grid>
          </Grid>
        ))}
        <Button variant="contained" onClick={() => goToNewNote()}>
          Add Note
        </Button>
      </Grid>
    </DialogContent>
  </>
);

const ShowNote: React.FC<{
  itemTitle: string;
  itemIndex: number;
  existingNote?: string;
  noteIndex?: number;
  goBack: () => void;
  dispatch: Dispatch<TodoAction>;
}> = ({ itemTitle, itemIndex, existingNote, noteIndex, goBack, dispatch }) => {
  const [text, setText] = useState(existingNote ?? "");
  return (
    <>
      <DialogTitle>
        {noteIndex !== undefined
          ? `Note ${noteIndex + 1} for ${itemTitle}`
          : `New note for ${itemTitle}`}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Grid
          container
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          wrap="nowrap"
          flex={1}
        >
          <Grid item>
            {noteIndex !== undefined && (
              <Button
                onClick={() => {
                  dispatch({ type: "userRemovedNote", itemIndex, noteIndex });
                  goBack();
                }}
              >
                Delete
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                goBack();
              }}
            >
              {existingNote ? "Discard Changes" : "Discard"}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(
                  noteIndex !== undefined
                    ? {
                        type: "userEditedNote",
                        itemIndex,
                        noteIndex,
                        contents: text,
                      }
                    : { type: "userAddedNote", itemIndex, contents: text }
                );
                goBack();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};
