import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import taskService from "./taskService";

const mock = new MockAdapter(axios);

describe("taskService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("fetches tasks successfully", async () => {
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
    mock
      .onGet("/api/tasks/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .reply(200, tasks);
    const response = await taskService.getTasks(token);
    expect(response).toEqual(tasks);
  });
});
