import React, { useState } from "react";
import List from "../List";

import Badge from '../Badge'

import "./AddList.scss";

const AddList = ({ colors }) => {
  const [isVisiblePopup, setVisiblePopup] = useState(false);

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
          <input type="text" className="field" placeholder="Category name" />
          <div className="add-list__popup-colors">
            <ul>
              <li>
                <Badge color="blue" />
              </li>
              <li></li>
            </ul>
          </div>
          <button className="button">Add category</button>
        </div>
      )}
    </div>
  );
};

export default AddList;
