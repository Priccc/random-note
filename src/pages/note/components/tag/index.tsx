import React from "react";
import { NumberOutlined } from "@ant-design/icons";
import { StickHtmlOption } from "../../constant";

import "./style.scss";

interface PropsDataType {
  emitStickOutput(option: StickHtmlOption): void
}

export const tagNodeOption: StickHtmlOption = {
  tag: 'span',
  className: '__note_style-tag',
  innerText: '#',
  contentEditable: 'true'
};

const EditorTagStick: React.FC<PropsDataType> = ({
  emitStickOutput
}) => {
  const handleTagStickClick = () => {
    emitStickOutput && emitStickOutput(tagNodeOption);
  };

  return (
    <div
      className="editor-tag-stick"
      onClick={handleTagStickClick}
    >
      <NumberOutlined />
    </div>
  );
};

export default EditorTagStick;