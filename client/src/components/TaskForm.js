import React, { useState } from "react";
import { useDispatch } from "react-redux";

const TaskForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch();
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text"> Task </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => e.target.value}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
