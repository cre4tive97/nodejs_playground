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

    // db.collection("post").insertOne(
    //   { _id: 3, 이름: "John", 나이: 20 },
    //   (error, result) => {
    //     console.log("저장완료");
    //   }
    // );
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });
    app.get("/write", (req, res) => {
      res.sendFile(__dirname + "/write.html");
    });

    app.post("/add", (req, res) => {
      res.send("전송완료");
      console.log(req.body.date);
      console.log(req.body.title);
      db.collection("post").insertOne(
        { title: req.body.title, date: req.body.date },
        (error, result) => {
          console.log("저장완료");
        }
      );
    });

    app.listen(8080, () => {
      console.log("listening on 8080");
    });
  }
);
