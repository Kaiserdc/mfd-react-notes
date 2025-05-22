import Dexie, { type Table } from 'dexie'
import type { Note } from '../interfaces'

export class NotesDexieDB extends Dexie {
    notes!: Table<Note, string>;

    constructor() {
        super('notes_database');
        this.version(1).stores({
            notes: 'id, title, content, created'
        });
    }
}

export const db = new NotesDexieDB();