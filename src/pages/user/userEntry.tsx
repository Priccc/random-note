import React from "react";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "@/store/user/atoms";
import { UserInfoState } from "@/store/user/types";

import './styles/userEnery.scss';

export default function UserEntry() {
  const [userInfo, setUserInfo] = useRecoilState<UserInfoState>(userInfoAtom);

  return (
    <div className="user-entry-component">
      <div className="userinfo-name">
        <div className="name-text">
          { userInfo?.name }
        </div>
      </div>
    </div>
  );
};