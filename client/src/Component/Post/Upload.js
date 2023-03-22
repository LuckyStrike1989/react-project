import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js";
import axios from 'axios';
import ImageUpload from "./ImageUpload.js";

function Upload(props) {
  const [Title, setTitle] = useState("")
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  let navigate = useNavigate();
  
  const onSubmit = (e) => {
    e.preventDefault();

    if( Title === "" || Content === "" ) {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title : Title
      , content: Content
      , image: Image
    }

    axios.post("/api/post/submit", body).then((response) => {
      if(response.data.success) {
        alert("글 작성이 완료되었습니다.");
        navigate("/");
      } else {
        alert("글 작성에 실패하였습니다.");
      }
    }).catch((err) => {
      console.log(err);
    });
    /*let tempArr = [...props.ContentList];
    tempArr.push(Content);
    props.setContentList([...tempArr]);
    setContent("");*/
  };

  const getCurrentTitleValue = (e) => {
    setTitle(e.currentTarget.value);
  };

  const getCurrentContentValue = (e) => {
    setContent(e.currentTarget.value);
  };

  /*useEffect(() => {
    console.log("Content가 바뀌었습니다!");
  }, [Content]);*/

  /*useEffect(() => {
    // 컴포넌트가 나타날 때 실행 될 코드
    alert('upload 컴포넌트가 나타났습니다.');
    return () => {
      // 컴폰너트가 죽을 때 실행될 코드
      alert('upload 컴포넌트가 죽었습니다.');
    };
  }, [])*/
  // [/*useEffect가 실행될 조건*/]일때 컴포넌트가 실행되거나 죽을때 딱 한번만 실행됨(즉, 한번만 실행됨)

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" value={Title} onChange={getCurrentTitleValue}/><br/>
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea id="content" value={Content} onChange={getCurrentContentValue}/>
        <UploadButtonDiv>
          <button onClick={onSubmit}>제출</button>
        </UploadButtonDiv><br/>
      </UploadForm>
    </UploadDiv>
  )
}

export default Upload