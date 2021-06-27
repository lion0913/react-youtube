const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

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

    let filePath =""
    let fileDuration =""
    // 비디오 정보 가져오기(러닝타임 등등)
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });

    // 썸네일 생성
    ffmpeg(req.body.url) //클라이언트에서 온 비디오 url 경로
        .on('filenames',  function(filenames) {
            //비디오 썸네일 파일이름 생성
            console.log('Will generate '+filenames.join(', '))
            console.log(filenames)
            filePath ="uploads/thumbnails/"+filenames[0]
        })
        .on('end', function(){
            //생성완료 후 상황
            return res.json({success : true, url : filePath, fileDuration : fileDuration});
        })
        .on('error', function(err){
            //에러가 났을 경우
            console.error(err);
            return res.json({success : false, err});
        })
        .screenshots({
            count : 3, //3개의 썸네일 찍기 가능
            folder : 'uploads/thumbnails', //썸네일 담을 위치
            size : '320x240', //사이즈
            filename : 'thumbnail-%b.png' //파일 이름(thumbnail-원래 이름)
        })


})

router.post('/uploadVideo', (req,res) => {
    // 비디오 정보를 저장한다.
    const video = new Video(req.body)
    video.save((err, doc) => {
        if(err) {
            return res.json({success : false, err})
        }
        res.status(200).json({success : true})
    }) //mongoDB 저장


})

router.get('/getVideos', (req,res) => {
    // 비디오를 디비에서 가져와서 클라이언트에 보낸다.
    Video.find() //비디오 컬렉션 안에 있는 모든 컬렉션을 가져온다.
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success : true, videos})
        })


})

module.exports = router;
