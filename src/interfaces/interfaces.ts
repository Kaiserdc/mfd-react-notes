export interface User {
    email: string;
}

export interface AuthContextType {
    user: User | null;
    signIn: (email: string, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    created: number;
}

export interface NotesContextType {
    notes: Note[];
    selectedNote: Note | null;
    editing: boolean;
    selectNote: (id: string) => void;
    addNote: () => void;
    updateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => Promise<void>;
    deleteNote: (id: string) => void;
    setEditing: (value: boolean) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}
