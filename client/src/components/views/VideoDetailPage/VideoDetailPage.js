import React, {useEffect, useState} from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = {videoId : videoId}
    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.videoDetail)

                } else {
                    alert("비디오 정보를 가져오기에 실패했습니다.")
                }
            })
    },[])

    if(VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>

        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:"3rem 4rem"}}>
                        {/*메인 비디오 부분*/}
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                        <List.Item
                            // subscribe components에 writer의 아이디를 보내주는 방법
                            actions={[subscribeButton]}>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        {/*    comments*/}

                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage