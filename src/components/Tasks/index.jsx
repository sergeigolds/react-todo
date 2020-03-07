import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  withoutEmpty
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Task title", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle
        })
        .catch(() => {
          alert("Cannot update task title");
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit icon" />
        </h2>
      </Link>

      <div className="tasks__items">
        {list.tasks &&
          list.tasks.map(task => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
