import List from "../components/List";
import data from "../data/data.json";
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

  const handleAddValue = () => {
    const newData = { ...displayData };
    Object.values(newData).forEach((rootNode) => {
      addValueToNodeAndChildren(rootNode);
    });

    setDisplayData(newData);
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


  const handleUpdateValueToNode = (targetId, newStatus) => {
    const newData = { ...data };

    Object.values(newData).forEach((rootNode) => {
      updateValueToNodeAndChildren(rootNode, targetId, newStatus);
      checkParentStatus(rootNode);
    });

    setDisplayData(newData);
  };

  
  const updateItem = (newStatus, id) => {
    handleUpdateValueToNode(id, newStatus);
  };

  useEffect(() => {
    handleAddValue();
  }, []);

  return (
    <div className="container">
      <div className="box">
        <List items={displayData} updateItem={updateItem} />
      </div>
    </div>
  );
}

export default App;
