export interface NoteSchema {
  id: string;
  content: string;
  tags?: string[];
  createTime: number;
  updateTime: number;
};

export const NoteTable = '&id, content, *tags, createTime, updateTime';