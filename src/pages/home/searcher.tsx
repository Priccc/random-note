import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Searcher: React.FC = () => {
  return (
    <div className="searcher-component">
      <Input
        size="large"
        placeholder="large size"
        prefix={<SearchOutlined />}
      />
    </div>
  )
};

export default Searcher;