const auth = require("./routes/auth");
const cors = require("cors");
const todos = require("./routes/todos");
const express = require("express");
const path = require("path");
const type = require("./routes/type");

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use("/auth", auth);
app.use("/todos", todos);
app.use("/type", type);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Server error");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening or port", port));
