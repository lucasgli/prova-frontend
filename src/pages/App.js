
import List from "../components/List";
import data from "../data/data.json";
import React, { useState, useEffect } from 'react';

import "../styles/App.css";
function App() {
  const [displayData, setDisplayData] = useState(data)
  const updateItem = (id) => {
    console.log("updateItem", id);
  };


  const addValueToNodeAndChildren = (node) => {
    node.checked = false;
  
    if (node.children && Object.keys(node.children).length > 0) {
      Object.values(node.children).forEach(child => {
        addValueToNodeAndChildren(child);
      });
    }
  };

  const handleAddValue = () => {
    const newData = { ...displayData };
    Object.values(newData).forEach(rootNode => {
      addValueToNodeAndChildren(rootNode);
    });

    setDisplayData(newData)
  };

  useEffect(() => {
    handleAddValue()
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
