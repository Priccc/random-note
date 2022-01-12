import React, { useCallback, useEffect, useRef, useState } from "react";
import { StickHtmlOption } from "./constant";
import EditorTagStick, { tagNodeOption } from "./components/tag";
import { insertEnter, insertNode, insertNodeToContent, stickOptionToNode } from "./utils";
import { RocketOutlined, SyncOutlined } from "@ant-design/icons";
import { throttle } from "lodash";
import { Button } from "antd";
import Note from "@/db/stores/note";

import './styles/editor.scss';

const NoteEditor: React.FC = () => {
  const NoteDB = new Note();
  // State
  const editorRef = useRef<HTMLDivElement>(null);
  const [noteID, setnoteID] = useState<string | null>(null);
  const [saveLoading, setsaveLoading] = useState<boolean>(false)
  const [lastSelection, setlastSelection] = useState<Selection | null>(null);
  const [lastRange, setlastRange] = useState<Range | null>(null);
  const [currentNode, setcurrentNode] = useState<HTMLElement | null>(null);
  const [noteTags, setnoteTags] = useState<string[]>([]);
  const [noteContent, setnoteContent] = useState<string>('');
  const [wordCount, setwordCount] = useState(0);

  // 记录光标最后的位置
  const getLastSelection = () => window.getSelection();
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode, target } = event;

    // 处理标签逻辑
    // 已经输入标签，且按下 Space | Enter
    if (currentNode && [13, 32].includes(keyCode)) {
      event.preventDefault();
      currentNode.contentEditable = 'false';

      let range = lastRange?.cloneRange();

      // 如果标签里无内容，则为一个普通 #
      if (currentNode.innerText === '#') {
        const normalKeyNode = document.createTextNode('#');

        range?.selectNode(currentNode);
        range = insertNode(normalKeyNode, range as Range);
      } else {
        range?.setStartAfter(currentNode);
        range?.collapse(true);

        // 增加 Tags
        noteTags.push(currentNode.innerText);
        setnoteTags(noteTags);
      }

      // 如果是 Enter
      if (keyCode === 13) {
        range = insertEnter(lastSelection as Selection, range as Range);
      }

      lastSelection?.removeAllRanges();
      lastSelection?.addRange(range as Range);

      setlastRange(range as Range);
      setcurrentNode(null);
    }
    // 如果是手动输入 #
    if (key === '#') {
      event.preventDefault();

      const node = stickOptionToNode(tagNodeOption);

      setcurrentNode(node);
      insertNodeToContent(node, lastRange as Range);
    }
  }, [lastSelection, currentNode]);
  const handleContentEditorClick = () => {
    const selection = getLastSelection();

    // rescore lastSelection & range
    setlastSelection(selection);
    setlastRange(selection?.getRangeAt(0) || null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    }
  }, [handleUserKeyPress]);
  useEffect(() => {
    console.log('Selection: ', lastSelection);
    console.log('Range: ', lastRange);
    console.log('Range Text: ', lastRange?.toString());
  }, [lastSelection, lastRange]);

  // Methods
  const handleSaveNoteContent = async () => {
    setsaveLoading(true);

    if (noteID) {
      NoteDB.update(noteID, noteContent, noteTags);
    } else {
      const noteID = await NoteDB.add(noteContent, noteTags);

      setnoteID(noteID as string);
    }

    setTimeout(() => setsaveLoading(false), 1000);
    console.log('~~~~~', noteID);
  };
  const onStickNodeInsert = (option: StickHtmlOption) => {
    const node = stickOptionToNode(option);
    let range = lastRange;

    // Set current insert stick node
    setcurrentNode(node);

    // 如果没有聚焦编辑区域
    if (!lastSelection && editorRef.current) {
      const selection = getSelection();
      const r = new Range();
      
      r.selectNodeContents(editorRef.current);
      r.collapse();
      selection?.removeAllRanges();
      selection?.addRange(r);

      setlastSelection(selection);
      setlastRange(r);

      range = r;
    }

    insertNodeToContent(node, range as Range);
  };
  const onContentEditorStatusChange = () => {};
  const onContentEditorInput = throttle((e) => {
    const { innerHTML, innerText } = e.target;

    setnoteContent(innerHTML);
    setwordCount(innerText.length);
  }, 1000, { leading: false });

  return (
    <div className="note-editor-component">
      <div className="actions-block">
        {/* Stick 小组件 */}
        <div className="stick-components">
          <div className="stick-item">
            <EditorTagStick
              emitStickOutput={onStickNodeInsert}
            ></EditorTagStick>
          </div>
        </div>
        {/* Save */}
        <div className="save-button">
          <Button
            type="primary"
            onClick={handleSaveNoteContent}
          >
            保存
          </Button>
        </div>
      </div>
      <div className="editor-content">
        {/* 编辑区域 */}
        <div
          ref={editorRef}
          className="editor __note_style-content"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onFocus={onContentEditorStatusChange}
          onBlur={onContentEditorStatusChange}
          onClick={handleContentEditorClick}
          onInput={onContentEditorInput}
        ></div>
      </div>
      <div className="editor-info-block">
        {/* 文字统计 */}
        <div className="word-counter">
          <div className="counter-num">
            <RocketOutlined />
            ~ { wordCount }
          </div>
        </div>
        {/* 自动保存文字动画 */
          saveLoading && (
            <div className="save-loading">
              <SyncOutlined spin />
              保存中...
            </div>
          )
        }
      </div>
    </div>
  );
};

export default NoteEditor;