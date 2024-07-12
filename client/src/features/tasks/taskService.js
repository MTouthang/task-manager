import axios from "axios";

const API_URL = "/api/task/";

const createTask = async (textData) => {
  const response = await axios.post(API_URL, textData);
  if (response.data) {
  }
  return response.data;
};

const taskService = { createTask };
export default taskService;
