const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

//multer(동영상 저장 라이브러리) config파일
let storage = multer.diskStorage({
    //파일 저장장소 지정
    destination : (req, file, cb) => {
        cb(null, "uploads/");
    },
    //파일 이름 선언
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter : (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== 'mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false)
        }
        cb(null, true)
    }
});

const upload = multer({storage : storage}).single("file");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req,res) => {
    //req: client에서 보낸것(비디오 파일)

    //파일을 받아서 서버에서 다운로드(multer dependency 이용)
    upload(req, res, err => {
        if(err) {
            return res.json({success : false, err})
        } else {
            //성공시 파일 경로, 파일 이름 리턴
            return res.json({success : true, url : res.req.file.path, fileName : res.req.file.filename})
        }
    })

})

router.post('/thumbnail', (req,res) => {
    // 썸네일 생성하고 비디오 러닝타임 가져오기
    ffmpeg(req.body.url)
        .on('filenames',  function(filenames) {
            console.log('Will generate '+filenames.join(', '))
            filePath ="uploads/thumbnails/"+filenames[0]
        })
        .on('end', function(){
            return res.json({success:true})
        })


})

module.exports = router;
