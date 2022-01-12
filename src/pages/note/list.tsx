import React, { useEffect, useState } from "react";
import { NoteSchema } from "@/db/schemas/note";
import Note from "@/db/stores/note";
import NoteItem from "./components/noteItem";

import "./styles/list.scss";

const NoteList: React.FC = () => {
  const NoteDB = new Note();
  const [noteList, setnoteList] = useState<NoteSchema[]>([]);

  useEffect(() => {
    NoteDB.getList().then(list => {
      setnoteList(list);
    });
  });

  return (
    <div className="note-list-component">
      {/* Note List */
        noteList.map(item => (
          <div
            key={item.id}
            className="note-list-item"
          >
            <NoteItem note={item}></NoteItem>
          </div>
        ))
      }
    </div>
  );
};

export default NoteList;