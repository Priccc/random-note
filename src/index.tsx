import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale/zh_CN";

import App from "./App";
import "./styles/themes/primary.css";
import "antd/dist/antd.css";
import "./styles/index.scss";

ReactDOM.render(
  <RecoilRoot>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </HashRouter>
    </ConfigProvider>
  </RecoilRoot>,
  document.getElementById('app')
);