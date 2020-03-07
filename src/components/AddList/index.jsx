import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

const AddList = ({ colors, onAdd }) => {
  const [isVisiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClosePopup = () => {
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
  };

  const addNewCategory = () => {
    if (!inputValue) {
      alert("Add category name");
      return;
    }

    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.filter(c => c.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClosePopup();
      })
      .catch(() => {
        alert("Loading error!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "add-list__button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Add new category"
          }
        ]}
      />
      {isVisiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClosePopup}
            src={closeSvg}
            alt="Close Popup"
            className="add-list__popup-close-btn"
          ></img>

          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            type="text"
            className="field"
            placeholder="Category name"
          />

          <div className="add-list__popup-colors">
            {colors.map(color => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>

          <button onClick={addNewCategory} className="button">
            {isLoading ? "Loading..." : "Add new category"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
