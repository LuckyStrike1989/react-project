const express = require("express");
const multer = require("multer");
const router = express.Router();

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

const setUpload = require("../Util/upload.js");

/**
 * 게시글 등록
 * /api/post/submit
 */
router.post("/submit", (req, res) => {
    let temp = req.body;

    console.log(temp);

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

/**
 * 게시글 목록
 * /api/post/list
 */
router.post("/list", (req, res) => {
    Post.find()
    .exec()
    .then((doc) => {
        res.status(200).json({ success: true, postList: doc });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

/**
 * 게시글 상세 보기
 * /api/post/detail
 */
router.post("/detail", (req, res) => {
    Post.findOne({ postNum : Number(req.body.postNum) })
    .exec()
    .then((doc) => {
        res.status(200).json({ success: true, post: doc });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

/**
 * 게시글 편집
 * /api/post/edit
 */
router.post("/edit", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    };

    Post.updateOne({ postNum : Number(req.body.postNum) }, {$set : temp})
    .exec()
    .then(() => {
        res.status(200).json({ success: true });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

/**
 * 게시글 삭제
 * /api/post/delete
 */
router.post("/delete", (req, res) => {
    Post.deleteOne({ postNum : Number(req.body.postNum) })
    .exec()
    .then(() => {
        res.status(200).json({ success: true });
    }).catch((err) => {
        res.status(400).json({ success: false })
    });
});

/*
//
// 내부 Storage 파일 업로드
//
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "image/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage : storage }).single("file");

router.post("/image/upload", (req, res) => {
    upload(req, res, err => {
        if( err ) {
            res.status(400).json({ success: false });
        } else {
            res.status(200).json({ success: true, filePath: res.req.file.path });
        }
    });
});
*/

/**
 * 외부 Storage 파일 업로드
 * /api/post/image/upload
 */
router.post("/image/upload", setUpload("react.community/post"), (req, res, next) => {
    console.log(res.req);
    res.status(200).json({ success: true, filePath: res.req.file.location });
});

module.exports = router;
