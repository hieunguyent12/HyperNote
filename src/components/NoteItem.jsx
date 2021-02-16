import { useState } from "react";

function NoteItem({ note, onNoteEdit, onNoteDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteState, setEditNoteState] = useState({
    title: note.title,
    content: note.content,
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onConfirmEdit = () => {
    // Only update if the fields are edited
    if (
      note.title === editNoteState.title &&
      note.content === editNoteState.content
    ) {
      return;
    }

    onNoteEdit({
      ...note,
      title: editNoteState.title,
      content: editNoteState.content,
    });
  };

  const onEditChange = (e) => {
    setEditNoteState({
      ...editNoteState,
      [e.target.name]: e.target.value,
    });
  };

  const onDelete = () => {
    onNoteDelete(note.id);
  };

  return (
    <div>
      <p>{note.title}</p>
      <p>{note.content}</p>
      {isEditing && (
        <div>
          <input
            name="title"
            type="text"
            value={editNoteState.title}
            onChange={onEditChange}
          />
          <input
            name="content"
            type="text"
            value={editNoteState.content}
            onChange={onEditChange}
          />
          <button onClick={onConfirmEdit}>Confirm Edit</button>
        </div>
      )}
      <button onClick={toggleEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default NoteItem;
