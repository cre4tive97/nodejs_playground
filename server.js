const express = require("express");
const app = express();

app.listen(8080, function () {
  console.log("listening on 8080");
});

app.get("/pet", function (req, res) {
  res.send("펫용품");
});

app.get("/beauty", (req, res) => {
  res.send("뷰티용품");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
