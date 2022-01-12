import { atom } from "recoil";
import { UserInfoState } from "./types";

export const userInfoAtom = atom<UserInfoState>({
  key: 'userInfoState',
  default: {
    uuid: 'xjidfok24rs',
    name: '测试姓名'
  }
});