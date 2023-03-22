import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js";
import axios from 'axios';
import ImageUpload from "./ImageUpload.js";

function Edit() {
    let params = useParams();
    let navigate = useNavigate();

    const [PostInfo, setPostInfo] = useState({});
    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("");
    const [Image, setImage] = useState()

    useEffect(() => {
        let body = {
            postNum : params.postNum
        };

        axios.post("/api/post/detail", body).then((response) => {
            if( response.data.success ) {
                setPostInfo(response.data.post);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        setTitle(PostInfo.title);
        setContent(PostInfo.content);
        setImage(PostInfo.image);
    }, [PostInfo])

    const onSubmit = (e) => {
        e.preventDefault();
    
        if( Title === "" || Content === "" ) {
            return alert("모든 항목을 채워주세요!");
        }
    
        let body = {
            title : Title
            , content: Content
            , postNum: params.postNum
            , image: Image
        }
    
        axios.post("/api/post/edit", body).then((response) => {
            if(response.data.success) {
                alert("글 수정이 완료되었습니다.");
                navigate(`/post/${params.postNum}`);
            } else {
                alert("글 수정에 실패하였습니다.");
            }
        }).catch((err) => {
          console.log(err);
        });
    };
    
    const getCurrentTitleValue = (e) => {
        setTitle(e.currentTarget.value);
    };
    
    const getCurrentContentValue = (e) => {
        setContent(e.currentTarget.value);
    };

    return (
        <UploadDiv>
            <UploadForm>
                <label htmlFor="title">제목</label>
                <input type="text" id="title" value={Title} onChange={getCurrentTitleValue}/><br/>
                <ImageUpload Image={Image} setImage={setImage} />
                <label htmlFor="content">내용</label>
                <textarea id="content" value={Content} onChange={getCurrentContentValue}/>
                <UploadButtonDiv>
                    <button className="cancel" 
                            onClick={(e) => {
                                e.preventDefault(); 
                                navigate(-1);
                            }}>취소</button>
                    <button onClick={onSubmit}>제출</button>
                </UploadButtonDiv><br/>
            </UploadForm>
        </UploadDiv>
    );
}

export default Edit