import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTasks, reset } from "../features/tasks/taskSlice";
import Spinner from "./Spinner";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getTasks());
    return () => dispatch(reset());
  }, [navigate, isError, message, dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="content">
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <h3> Empty Task </h3>
      )}
    </section>
  );
};

export default TaskList;
