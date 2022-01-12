import React from "react";
import { NoteSchema } from "@/db/schemas/note";

import "./style.scss";

interface PropsDataType {
  note: NoteSchema
}

const NoteItem: React.FC<PropsDataType> = ({
  note
}) => {
  return (
    <div className="note-item-componet">
      <div
        className="note-content __note_style-content"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></div>
      <div className="note-tags">
        {/* Note Tags List */
          note.tags &&
          note.tags.map((item, idx) => (
            <div
              key={idx}
              className="note-tag-item"
            >
              { item }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default NoteItem;