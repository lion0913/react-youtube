import React, {useState} from 'react';
//ant design 에서 css form을 가져옴
import {Typography, Button, Form, message, Input, Icon} from "antd";
import Dropzone from 'react-dropzone';
import {getIn} from "formik";
import Axios from 'axios';

const {TextArea} = Input;
const {Title} = Typography;

const PrivateOptions = [
    {value : 0, label : "Private"},
    {value : 1, label : "Public"}
]

const CategoryOptions = [
    {value : 0, label : "Film & Animation"},
    {value : 1, label : "Auto & Vehicles"},
    {value : 2, label : "Music"},
    {value : 3, label : "Pets & Animals"}
]


//functional component 생성
function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0) //private : 0 , public : 1
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        //e : 뭔가 이벤트가 발생했을때(한번 입력할때)의 변경된 state
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => { //files는 내가 업로드한 파일의 정보를 가지고 있음
        let formData = new FormData;
        //파일을 보낼때 헤더에 컨텐츠 타입을 보내줘야 서버에서 제대로 받을 수 있음.
        const config = {
            header:{'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {

                } else {
                    alert("비디오 업로드를 실패했습니다.")
                }
            })
    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/*Drop Zone*/}
                    <Dropzone onDrop={onDrop}
                              multiple={false}
                              maxSize={1000000000}
                    >{({ getRootProps, getInputProps}) =>
                                  <div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                                  alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                      <input {...getInputProps()} />
                                      <Icon type="plus" style={{fontSize:'3rem'}} />
                                  </div>
                              }
                    </Dropzone>

                    <div>
                        <img src alt />
                    </div>
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                {/*private or public select box*/}
                <select onChange={onPrivateChange}>
                    {/*map을 이용해서 option 바를 더 가독성 있게 사용*/}
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

//다른 파일에도 이용 가능하도록 export
export default VideoUploadPage