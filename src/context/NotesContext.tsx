import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {Note, NotesContextType} from "../interfaces";
import {db} from "../utils";

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const selectedNote = notes.find(n => n.id === selectedNoteId) || null;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
            const loadNotes = async () => {
                const allNotes = await db.notes.toArray();
                const sorted = allNotes.sort((a, b) => b.created - a.created);
                setNotes(sorted);

                const lastId = localStorage.getItem('lastNoteId');
                if (lastId && sorted.find((n) => n.id === lastId)) {
                    setSelectedNoteId(lastId);
                } else if (sorted.length > 0) {
                    setSelectedNoteId(sorted[0].id); // fallback: первый по дате
                }
            };

            loadNotes();
        }, []);


    const addNote = async () => {
        const newNote: Note = {
            id: crypto.randomUUID(),
            title: 'Новая заметка',
            content: '',
            created: Date.now(),
        };
        await db.notes.add(newNote);
        setNotes((prev)=>[newNote, ...prev])
        setSelectedNoteId(newNote.id)
        setEditing(true);
    };

    const updateNote = async (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => {
        await db.notes.update(id,updates)
        setNotes((prev) =>
            prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
        );
    };

    const deleteNote = (id: string) => {
        db.notes.delete(id)
        setNotes((prev) => prev.filter((note) => note.id !== id));
        if (selectedNoteId === id) setSelectedNoteId(null);
    };

    const selectNote = (id: string) => {
        setSelectedNoteId(id);
        localStorage.setItem('lastNoteId', id);
    };

    return (
        <NotesContext.Provider
            value={{ notes, selectedNote, addNote, updateNote, deleteNote, selectNote, editing,setEditing, searchTerm, setSearchTerm }}
        >
            {children}
        </NotesContext.Provider>
    );
}