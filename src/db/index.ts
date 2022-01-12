import Dexie, { Table } from 'dexie';
import { NoteSchema, NoteTable } from './schemas/note';
// import { UserScheme, UserTable } from './stores/user';

const dbVersion = 1;

export class RandomNoteDexie extends Dexie {
  // users!: Table<UserScheme>;
  notes!: Table<NoteSchema>; 

  constructor() {
    super('RandomNoteDatabase');

    this.version(dbVersion).stores({
      // users: UserTable,
      notes: NoteTable,
    });
  }
}

const db = new RandomNoteDexie();

export default db;