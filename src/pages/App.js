import List from "../components/List";
import data from "../data/data.json";
import LocalStorage from "../helpers/LocalStorage";
import React, { useState, useEffect } from "react";

import "../styles/App.css";

function App() {
  const [displayData, setDisplayData] = useState(data);

  const addValueToNodeAndChildren = (node) => {
    node.checked = false;

    if (node.children && Object.keys(node.children).length > 0) {
      Object.values(node.children).forEach((child) => {
        addValueToNodeAndChildren(child);
      });
    }
  };

  const createDisplayData = () => {
    const updatedList = LocalStorage.get("updatedList");
    if (updatedList) {
      setDisplayData(updatedList);
    } else {
      const newData = { ...displayData };
      Object.values(newData).forEach((rootNode) => {
        addValueToNodeAndChildren(rootNode);
      });

      setDisplayData(newData);
    }
  };

  const checkParentStatus = (node) => {
    if (node.children && Object.keys(node.children).length > 0) {
      let allChecked = true;
      let allUnchecked = true;

      Object.values(node.children).forEach((child) => {
        if (child.checked) {
          allUnchecked = false;
        } else {
          allChecked = false;
        }
      });

      if (allChecked) {
        node.checked = true;
      } else if (allUnchecked) {
        node.checked = false;
      } else {
        node.checked = null;
      }
    }
  };

  const updateValueToNodeAndChildren = (node, targetId, value) => {
    if (node.id === targetId) {
      node.checked = value;

      if (node.children && Object.keys(node.children).length > 0) {
        Object.values(node.children).forEach((child) => {
          updateValueToNodeAndChildren(child, child.id, value);
        });
      }
    } else if (node.children && Object.keys(node.children).length > 0) {
      Object.values(node.children).forEach((child) => {
        updateValueToNodeAndChildren(child, targetId, value);
        checkParentStatus(node);
      });
    }
  };

  const handleUpdateValueToNode = (targetId, newValue) => {
    const newData = { ...displayData };

    Object.values(newData).forEach((rootNode) => {
      updateValueToNodeAndChildren(rootNode, targetId, newValue);
      checkParentStatus(rootNode);
    });

    setDisplayData(newData);
    LocalStorage.set("updatedList", newData);
  };

  const updateItem = (newValue, id) => {
    handleUpdateValueToNode(id, newValue);
  };

  useEffect(() => {
    createDisplayData();
  }, []);

  return (
    <div className="container" data-testid="app">
      <div className="box">
        <List data-testid="list" items={displayData} updateItem={updateItem} />
      </div>
    </div>
  );
}

export default App;
