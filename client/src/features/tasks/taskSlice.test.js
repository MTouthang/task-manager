import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import { getTasks } from "./taskSlice";
import taskService from "./taskService";

// configure the test
const mockStore = configureMockStore([thunk]);
const mock = new MockAdapter(axios);

describe("taskSlice", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      task: {
        tasks: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      },
      auth: {
        user: { token: "mock_token" },
      },
    });
  });

  afterEach(() => {
    mock.reset();
    store.clearActions();
  });

  // get task test
  test("calls the taskService to fetch tasks", async () => {
    const token = "mock_token";
    const tasks = [
      {
        _id: "6680687482c012580c529120",
        text: "learn tailwind css",
        user: "6680687482c012580c529333",
        createdAt: "6680687482c012580c529128",
        updatedAt: "6680687482c012580c529128",
        __v: 0,
      },
    ];
    const getTasksSpy = jest
      .spyOn(taskService, "getTasks")
      .mockResolvedValue(tasks);
    await store.dispatch(getTasks());
    expect(getTasksSpy).toHaveBeenCalledWith(token);
  });
});
