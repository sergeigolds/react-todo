import React, { useState, useEffect } from "react";
import axios from "axios";

import { List, AddList, Tasks } from "./components";

import listSvg from "./assets/img/list.svg";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddNewCategory = obj => {
    const NewList = [...lists, obj];
    setLists(NewList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: <img src={listSvg} alt="Menu icon"></img>,
              name: "All categories"
            }
          ]}
        />
        {lists ? (
          <List
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            isRemovable
          />
        ) : (
          "Loading..."
        )}
        <AddList onAdd={onAddNewCategory} colors={colors} />
      </div>
      <div className="todo__tasks">{lists && <Tasks list={lists[1]} />}</div>
    </div>
  );
}

export default App;
