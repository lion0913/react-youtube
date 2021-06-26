const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//video 컬렉션 생성
const videoSchema = mongoose.Schema({

    //writer: 작성자의 아이디(usermodel에서 정보를 불러오려고 이렇게 선언)
    writer: {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        maxLength : 50
    },
    description : {
        type : String
    },
    privacy : {
        type : Number
    },
    filePath : {
        type : String
    },
    views : {
        type : Number,
        default : 0
    },
    duration : {
        type : String
    },
    thumbnail : {
        type : String
    }
}, {timestamps: true})//timestamp : 만든날짜, update날짜가 표시가 된


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }