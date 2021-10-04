const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://harryborrison5148:9T6MuLC8R1PoHjoG@cluster0.gbaka.mongodb.net/todoapp?retryWrites=true&w=majority",
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    db = client.db("todoapp");

    app.listen(8080, () => {
      console.log("listening on 8080");
    });

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });
    app.get("/write", (req, res) => {
      res.sendFile(__dirname + "/write.html");
    });
    app.get("/list", (req, res) => {
      db.collection("post")
        .find()
        .toArray((error, result) => {
          console.log(result);
          res.render("list.ejs", { posts: result });
        });
    });

    app.post("/add", (req, res) => {
      res.send("전송완료");
      db.collection("counter").findOne(
        { name: "게시물 개수" },
        (error, result) => {
          let totalPostCount = result.totalPostCount;
          db.collection("post").insertOne(
            {
              _id: totalPostCount + 1,
              title: req.body.title,
              date: req.body.date,
            },
            (error, result) => {
              console.log("저장완료");
              db.collection("counter").updateOne(
                { name: "게시물 개수" },
                { $inc: { totalPostCount: 1 } },
                function (error, result) {
                  if (error) {
                    return console.log(error);
                  }
                }
              );
            }
          );
        }
      );
    });
  }
);
