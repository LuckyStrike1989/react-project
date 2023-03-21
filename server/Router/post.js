const express = require("express");
const router = express.Router();

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

router.post("/submit", (req, res) => {
    let temp = req.body;

    Counter.findOne({name: "counter"})
    .exec()
    .then(( counter ) => {
        temp.postNum = counter.postNum
        const CommunityPost = new Post(temp);
        CommunityPost.save().then(() => {
            Counter.updateOne({name: "counter"}, {$inc : {postNum : 1}}).then(() => {
                res.status(200).json({ success: true });
            });
        });
    }).catch((err) => {
        res.status(400).json({ success: false });
    });
});

router.post("/list", (req, res) => {
    Post.find()
    .exec()
    .then((doc) => {
        res.status(200).json({ success: true, postList: doc });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

router.post("/detail", (req, res) => {
    Post.findOne({ postNum : Number(req.body.postNum) })
    .exec()
    .then((doc) => {
        res.status(200).json({ success: true, post: doc });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

router.post("/edit", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    };

    Post.updateOne({ postNum : Number(req.body.postNum) }, {$set : temp})
    .exec()
    .then(() => {
        res.status(200).json({ success: true });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

router.post("/delete", (req, res) => {
    Post.deleteOne({ postNum : Number(req.body.postNum) })
    .exec()
    .then(() => {
        res.status(200).json({ success: true });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

module.exports = router;
