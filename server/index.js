const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

// mongodb+srv://maestrois:lagenka0921!@cluster0.e5mts.mongodb.net/?retryWrites=true&w=majority
// body-parsor

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use("/api/post", require("./Router/post.js"));

app.listen(port, () => {
    //mongoose.set('strictQuery', false);
    mongoose.connect(
        "mongodb+srv://maestrois:lagenka0921!@cluster0.e5mts.mongodb.net/Community?retryWrites=true&w=majority"
    ).then(() => {
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