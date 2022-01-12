import React from "react";

import './styles/index.scss';

export default function TagGroup() {
  const tagGroups = [
    { id: 0, name: '全部标签' },
    { id: 1, name: 'abc' },
    { id: 2, name: 'cfbs' },
  ];

  return (
    <div className="tag-group-component">
      <div className="group-title">
        标签分组
      </div>
      <div className="groups-content">
        {
          tagGroups.map(item => (
            <div
              key={item.id}
              className="group-item"
            >
              { item.name }
            </div>
          ))
        }
      </div>
    </div>
  );
};