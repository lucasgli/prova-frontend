import React, { useState } from "react";
import "./styles.css";
export default function List({ items, updateItem }) {
  const [idsToOpen, setIdsToOpen] = useState([]);

  const handleClick = (newItem) => {
    setIdsToOpen((prevItems) => {
      if (prevItems.includes(newItem)) {
        return prevItems.filter((item) => item !== newItem);
      } else {
        return [...prevItems, newItem];
      }
    });

    updateItem(newItem);
  };

  return (
    <div>
      {Object.values(items).map((item) => {
        return (
          <div key={item.id}>
            <div className="list-item">
              <div className="left">
                <div
                  className="checkbox"
                  style={{ paddingLeft: `${item.level * 25}px` }}
                >
                  check
                </div>
                <span>{item.name}</span>
              </div>
              <div className="right">
                {Object.values(item.children).length ? (
                  <div onClick={() => handleClick(item.id)}>icon</div>
                ) : null}
              </div>
            </div>

            {idsToOpen.find((id) => id === item.id) ? (
              <div>
                <List items={item.children} updateItem={updateItem} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
