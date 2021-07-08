import React, {useState} from 'react';
import Axios from 'axios';
import {useSelector} from "react-redux";

function Comment(props) {

    const [commentValue, setCommentValue] = useState("")

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const user = useSelector(state => state.user) //리덕스에서 유저정보 가져오기

    const onSubmit = (event) => {
        const videoId = props.postId

        //이벤트가 없을 시 클릭버튼 눌러도 새로고침 안되도록 수정
        event.preventDefault()

        const variables = {
            content : commentValue,
            writer : user.userData._id,
            postId : videoId
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result )

                } else {
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/*Comment Lists*/}

            {/*Root Comment Form*/}

            <form style={{display :'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요."
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>

            </form>

        </div>

    )
}

export default Comment