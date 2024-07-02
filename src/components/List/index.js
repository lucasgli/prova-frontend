import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
              <div className="right">
                {Object.values(item.children).length ? (
                  <div>
                    <FontAwesomeIcon
                      style={{
                        color: idsToOpen.find((id) => id === item.id)
                          ? "blue"
                          : "",
                      }}
                      onClick={() => handleClick(item.id)}
                      icon={faChevronDown}
                      className={
                        currentAnimatingId
                          ? idsToOpen.find((id) => id === item.id)
                            ? "rotate-up"
                            : "rotate-down"
                          : ""
                      }
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {idsToOpen.find((id) => id === item.id) ? (
              <div>
                <List items={item.children} updateItem={updateItem} />{" "}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
