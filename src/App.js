import { useState, useEffect } from "react";
import "./App.css";
import uuid from "react-uuid";
import Sidebar from "./Sidebar.js";
import Main from "./Main.js";

function App() {
 //understand why we used localStorage as initial value and parsed it 
  
  const savedNotes = window.localStorage.notes;
  const initialNotes = savedNotes ? JSON.parse(savedNotes) : [];
  const [notes, setNotes] = useState(initialNotes);

  const [activeNote, setActiveNote] = useState(undefined);

  // study useEffect and localStorage
  useEffect(() => {
    window.localStorage.setItem("notes" , JSON.stringify(notes));
  }, [notes]);


  // Used to create a new note with some default values
  const onAddNote = () => {
    // --> Creating a default note
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "This is the body",
      lastModified: Date.now(),
    };

    // Saving this default note to the notes array
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id)
  };

  // Used to delete the note by noteID
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  // --> Used to delete the note by noteID
  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  // --> Used to return the current active note by noteID
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  // const onClickOutSide = () => {
  //   // console.log("Clicked outside")
  //   setActiveNote(null)
  // }

  return (
    <div className="App">
      {/* Sidebar: Left side */}
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        
      />
      
      {/* Main: Right side */}
      <Main setActiveNote={setActiveNote} activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;