import { StickHtmlOption } from "./constant";

export const stickOptionToNode = (option: StickHtmlOption): HTMLElement => {
  const el = document.createElement(option.tag);

  option.className && (el.className = option.className);
  option.innerText && (el.innerText = option.innerText);
  option.contentEditable && (el.contentEditable = option.contentEditable);

  // return fragment;
  return el;
};

// 光标出插入 Node
// 处理光标位置
export const insertNode = (node: HTMLElement | Text, range: Range): Range => {
  let r = range;

  r.deleteContents();
  r.insertNode(node);
  r = r.cloneRange();
  r.setStartAfter(node);
  r.collapse(true);

  return r;
};

// 插入换行
export const insertEnter = (selection: Selection, range: Range): Range => {
  // const enterNode = document.createElement('br');
  // const enterNode = document.createTextNode(' ');

  // range = insertNode(enterNode, range as Range);

  console.log(111111111, selection.isCollapsed);
  console.log(222222222, selection.rangeCount);

  return range;
};

// 插入 Node 到 Content
export const insertNodeToContent = (node: HTMLElement, range: Range) => {
  const selection = window.getSelection();
  let r = range;

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(r);
  
    r = selection.getRangeAt(0);
    r = insertNode(node, r);
    
    selection.removeAllRanges();
    selection.addRange(r);
  }
};