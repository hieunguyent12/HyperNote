import { useState, useEffect, useContext } from "react";
import "firebase/firestore";

import firebase, { firestore } from "../firebase";
import { AuthContext } from "../authContext";

import NoteItem from "./NoteItem";
import SignIn from "./SignIn";

const firestoreNotesRef = firestore.collection("notes");

function Notes() {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const [contentInputState, setContentInputState] = useState({
    noteTitle: "",
    noteContent: "",
  });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let firestoreListener;

    // Make sure that the user is signed in before listening to the database
    if (user && authState.isSignedIn) {
      firestoreListener = firestoreNotesRef
        .where("uid", "==", user.uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          const notes = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setNotes(notes);
        });
    }

    // Unsubscribe from database
    return () => {
      if (firestoreListener) {
        firestoreListener();
      }
    };
  }, [user]);

  const onChange = (e) => {
    setContentInputState({
      ...contentInputState,
      [e.target.name]: e.target.value,
    });
  };

  const onNoteAdd = () => {
    firestoreNotesRef.add({
      uid: user.uid,
      title: contentInputState.noteTitle,
      content: contentInputState.noteContent,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setContentInputState({
      noteTitle: "",
      noteContent: "",
    });
  };

  const onNoteEdit = (editedNote) => {
    firestoreNotesRef
      .doc(editedNote.id)
      .update({
        ...editedNote,
      })
      .catch(() => console.log("error updating note"));
  };

  const onNoteDelete = (noteId) => {
    firestoreNotesRef
      .doc(noteId)
      .delete()
      .catch(() => console.log("error deleting note"));
  };

  return (
    <div>
      <h3>Notes</h3>
      <div>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onNoteEdit={onNoteEdit}
            onNoteDelete={onNoteDelete}
          />
        ))}
      </div>
      <input
        type="text"
        onChange={onChange}
        value={contentInputState.noteTitle}
        name="noteTitle"
      ></input>
      <input
        type="text"
        onChange={onChange}
        value={contentInputState.noteContent}
        name="noteContent"
      ></input>
      <button onClick={onNoteAdd}>New Note</button>
    </div>
  );
}

export default Notes;
