import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import TaskItem from "./TaskItem";

describe("TaskItem", () => {
  const task = {
    _id: "1333",
    createdAt: "2023-07-0900000",
    text: "learn block chain",
  };

  const mockStore = configureStore([]);
  const store = mockStore({});

  test("renders task details correctly", () => {
    render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );
    expect(screen.getByText(task.text)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(task.createdAt).toLocaleString("en-us"))
    ).toBeInTheDocument();
  });
});
