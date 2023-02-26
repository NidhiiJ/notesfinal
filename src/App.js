import { useState, useEffect } from "react";
import "./App.css";
import uuid from "react-uuid";
import Sidebar from "./Sidebar.js";
import Main from "./Main.js";

function App() {
 //understand why we used localStorage as initial value and parsed it 
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);

  const [activeNote, setActiveNote] = useState(false);

  //  console.log(activeNote)

  //study useEffect and localStorage
  useEffect(() => {
    
    localStorage.setItem("notes" , JSON.stringify(notes));
  }, [notes]);
  

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "this is the body",
      lastModified: Date.now(),
    };

    // console.log({ newNote });
    setNotes([newNote, ...notes]);
    // console.log({ notes });
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />

      {/* we use () to call the function there itself */}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
