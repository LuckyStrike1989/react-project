const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/key.js");

const app = express();
const port = 5000;

// body-parsor

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use("/api/post", require("./Router/post.js"));
app.use("/api/user", require("./Router/user.js"));

app.listen(port, () => {
    //mongoose.set('strictQuery', false);
    mongoose.connect(config.mongoURI)
    .then(() => {
        console.log(`Example app listening at http://localhost:${port}`);
        console.log("Connecting MongoDB...");
    }).catch((err) => {
        console.log(`${err}`);
    });
});

app.get('/', (req, res) => {
    // res.send('Hello World');
    // res.send(path.join(__dirname, "/index.html"));
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

/*app.get('/express', (req, res) => {
    res.send('Hello Express!');
});*/

/*
1. Post MongoDB Model
2. Client CSS (Bootstrap, Emotion)
*/