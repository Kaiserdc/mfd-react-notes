import {useNotes} from "../hooks";
import {useEffect, useState} from "react";
import {Button, Group, Modal, Stack, Text, TextInput} from "@mantine/core";
import {marked} from 'marked';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export function Workspace() {
    const {selectedNote, updateNote, deleteNote, editing, setEditing} = useNotes()
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

    useEffect(() => {
        if (selectedNote) {
            setValue(selectedNote.content)
            setTitle(selectedNote.title)
            setEditMode(editing);
        }
    }, [selectedNote?.id])

    useEffect(() => {
        if (editMode && selectedNote) {
            updateNote(selectedNote.id, {content: value, title})
        }
    }, [value, title]);

    if (!selectedNote) return <Text>Выберите заметку</Text>;

    const handleDelete = () => {
        deleteNote(selectedNote.id);
        setConfirmOpen(false);
    };

    return (
        <Stack>
            {editMode ? (<>
                    <TextInput label="Название зметки"
                               value={title}
                               onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                </>
            ) : (
                <>
                    <Text fw={700} fz="xl" mb="sm">{selectedNote.title}</Text>
                </>
            )}
            <Group>
                <Button color="red" onClick={() => setConfirmOpen(true)}>
                    Удалить
                </Button>
                <Button onClick={() => {
                    setEditMode((prev) => !prev)
                    setEditing(!editMode)
                }
                }
                >
                    {editMode ? 'Обновить' : 'Редактировать'}
                </Button>
            </Group>

            {editMode ? (
                <SimpleMDE value={value} onChange={setValue}/>
            ) : (
                <div dangerouslySetInnerHTML={{__html: marked(value)}}/>
            )}

            <Modal
                opened={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title="Подтвердите удаление"
            >
                <Text mb="md">Вы уверены, что хотите удалить заметку?</Text>
                <Group justify="space-between">
                    <Button variant="default" onClick={() => setConfirmOpen(false)}>
                        Отмена
                    </Button>
                    <Button color="red" onClick={handleDelete}>
                        Удалить
                    </Button>
                </Group>
            </Modal>
        </Stack>
    );
}

