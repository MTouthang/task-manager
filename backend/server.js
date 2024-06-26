const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddlewar");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", require("./routes/taskRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
