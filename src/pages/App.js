
import List from "../components/List";
import data from "../data/data.json";

import "../styles/App.css";
function App() {
  const updateItem = (id) => {
    console.log("updateItem", id);
  };

  return (
    <div className="container">
      <div className="box">
        <List items={data} updateItem={updateItem} />
      </div>
    </div>
  );
}

export default App;
