import React, { useState } from "react";
import HeatMap from "../heatMap";
import NoteEditor from "../note/editor";
import NoteList from "../note/list";
import TagGroup from "../tagGroup";
import UserEntry from "../user/userEntry";
import Searcher from "./searcher";

import "./styles/index.scss";

const Home: React.FC = () => {
  const [isEditor, setisEditor] = useState<boolean>(false);

  return (
    <div className="home-container">
      <div className="sidebar-block">
        {/* <div className="user-entry-block">
          <UserEntry></UserEntry>
        </div> */}
        <div className="heat-map-block">
          <HeatMap></HeatMap>
        </div>
        <div className="tag-group-block">
          <TagGroup></TagGroup>
        </div>
      </div>
      <div className="viewer-block">
        <div className="search-block">
          <Searcher></Searcher>
        </div>
        <div className="note-list-block">
          <NoteList></NoteList>
        </div>
      </div>
      {/* 编辑区域 */
        isEditor && (
          <div className="editor-block">
            <NoteEditor></NoteEditor>
          </div>
        )
      }
    </div>
  );
};

export default Home;