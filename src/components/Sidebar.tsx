import {useNotes} from "../hooks";
import {Button, NavLink, ScrollArea, Stack} from "@mantine/core";


export function Sidebar() {
    const {notes, selectedNote, selectNote, addNote, searchTerm} = useNotes()
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollArea style={{height: '100%'}} p="md">
            <Stack>
                <Button fullWidth onClick={addNote}>Новая заметка</Button>
                {filteredNotes.map((note) => (
                    <NavLink
                        key={note.id}
                        label={note.title || 'Без названия'}
                        active={selectedNote?.id === note.id}
                        onClick={() => selectNote(note.id)}
                    />
                ))}
            </Stack>
        </ScrollArea>
    );
}

