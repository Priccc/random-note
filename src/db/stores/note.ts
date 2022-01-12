/**
 * db note store
 */
import { Table } from "dexie";
import { v4 as uuid } from "uuid";
import _db from '../index';
import { NoteSchema } from "../schemas/note";

export default class Note {
  db: Table<NoteSchema>;

  constructor () {
    this.db = _db && _db.notes; 
  }

  // 新增 Note
  async add (
    content: string,
    tags?: string[]
  ) {
    const time = new Date().getTime();
    const note: NoteSchema = {
      id: uuid(),
      content,
      tags: [],
      createTime: time,
      updateTime: time
    };

    if (tags) {
      note.tags = tags;
    }

    try {
      await this.db.add(note);

      return note.id;
    } catch (err) {
      console.error(err);
    }
  }

  // 更新 Note
  async update (
    id: string,
    content: string,
    tags?: string[]
  ) {
    const time = new Date().getTime();

    try {
      await this.db
        .where('id')
        .equals(id)
        .modify({
          content,
          tags,
          updateTime: time
        });
    } catch (err) {
      console.error(err);
    }
  }

  // 获取 Note List
  async getList (): Promise<NoteSchema[]> {
    const list = await this.db.orderBy('updateTime').toArray();

    return list;
  }
};