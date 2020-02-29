import React from "react";
import classNames from "classnames";

import removeSvg from "../../assets/img/remove.svg";

import Badge from "../Badge";

import "./List.scss";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = item => {
    if (window.confirm("Are you sure to delete category")) {
      onRemove(item);
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>

          <span>{item.name}</span>

          {isRemovable && (
            <img
              onClick={() => removeList(item)}
              src={removeSvg}
              className="list__remove-icon"
              alt="remove category"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
