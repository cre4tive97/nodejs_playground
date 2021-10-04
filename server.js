const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://harryborrison5148:9T6MuLC8R1PoHjoG@cluster0.gbaka.mongodb.net/todoapp?retryWrites=true&w=majority",
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    db = client.db("todoapp");

    db.collection("post").insertOne(
      { 이름: "John", 나이: 20 },
      (error, result) => {
        console.log("저장완료");
      }
    );

    app.listen(8080, () => {
      console.log("listening on 8080");
    });
  }
);
