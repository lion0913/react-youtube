const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req,res) => {
    //req: client에서 보낸것(비디오 파일)

    //파일을 받아서 서버에서 다운로드(multer dependency 이용)

})

module.exports = router;
