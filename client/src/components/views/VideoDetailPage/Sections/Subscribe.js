import React, {useEffect, useState} from 'react';
import Axios from "axios";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        let variable = {
            userTo : props.userTo
        }

        //구독자 수 가져오는 api
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert("구독자 수 정보를 받아오지 못했습니다.")
                }
            })

        let subscribedVariable = {
            userTo : props.userTo,
            userFrom : localStorage.getItem('userId')
        }

        //유저가 해당 채널을 구독하는지
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert("정보를 받아오지 못했습니다.")
                }
            })
    })

    const onSubscribe = () => {
        let subscribedVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }
        if(Subscribed) {
            //이미 구독중이라면
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber-1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert("구독 취소에 실패했습니다.")
                    }
                })
        } else {
            //구독안했다면

            Axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber+1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert("구독에 실패했습니다.")
                    }
                })

        }
    }
    return (
        <div>
            <button
                style={{backgroundColor:`${Subscribed?'#CC0000':'#AAAAAA'}`, borderRadius:'4px',
                color:'white', padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'}}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed?'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe