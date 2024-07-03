import React, { useState } from "react";
import ArrowIcon from "../ArrowIcon";
import Checkbox from "../Checkbox";

import "./styles.css";

export default function List({ items, updateItem }) {
  const [idsToOpen, setIdsToOpen] = useState([]);
  const [currentAnimatingId, setCurrentAnimatingId] = useState(null);

  const handleClick = (newItem) => {
    setCurrentAnimatingId(newItem);
    setIdsToOpen((prevItems) => {
      if (prevItems.includes(newItem)) {
        return prevItems.filter((item) => item !== newItem);
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const handleUpdate = (checked, id) => {
    updateItem(!checked, id);
  };

  return (
    <div>
      {Object.values(items).map((item) => {
        const isAnimating = currentAnimatingId === item.id;

        return (
          <div key={item.id}>
            <div className="list-item">
              <div
                onClick={() => handleUpdate(item.checked, item.id)}
                className="left"
              >
                <div
                  className="checkbox"
                  style={{ paddingLeft: `${item.level * 30}px` }}
                >
                  <Checkbox id={item.id} checked={item.checked} />
                </div>
                <span>{item.name}</span>
              </div>
              {Object.values(item.children).length ? (
                <div className="right" onClick={() => handleClick(item.id)}>
                  <ArrowIcon
                    isAnimating={isAnimating}
                    isOpen={idsToOpen.find((id) => id === item.id)}
                  />
                </div>
              ) : null}
            </div>

            {idsToOpen.find((id) => id === item.id) ? (
              <List items={item.children} updateItem={updateItem} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
