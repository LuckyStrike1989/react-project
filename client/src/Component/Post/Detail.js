import React, { useState, useEffect } from 'react'
import { PostDiv, SpinnerDiv, Post, BtnDiv } from "../../Style/PostDetailCSS.js";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function Detail() {
    let params = useParams();
    let navigate = useNavigate();

    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);

    useEffect(() => {
        let body = {
            postNum : params.postNum
        };

        axios.post("/api/post/detail", body).then((response) => {
            if( response.data.success ) {
                setPostInfo(response.data.post);
                setFlag(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        console.log(PostInfo);
    }, [PostInfo]);

    const DeleteHandler = (e) => {
        e.preventDefault();

        if( window.confirm("정말로 삭제하시겠습니까?") ) {
            let body = {
                postNum : params.postNum
            };
    
            axios.post("/api/post/delete", body).then((response) => {
                if( response.data.success ) {
                    alert("게시글이 삭제되었습니다.");
                    navigate("/list")
                }
            }).catch((err) => {
                console.log(err);
                alert("게시글 삭제에 실패하였습니다.");
            });
        }
    };

    // 내부 storage 저장 할때, http://localhost:5000/${PostInfo.image}
    return (
        <PostDiv>
            {
                Flag ?
                (
                    <>
                        <Post>
                            <h1>{PostInfo.title}</h1>
                            { PostInfo.image ?  <img src={PostInfo.image} alt="" style={{ width: "100%", height: "auto" }} /> : null}
                            <p>{PostInfo.content}</p>   
                        </Post>
                        <BtnDiv>
                            <Link to="/list">
                                <button className="list">목록</button>
                            </Link>
                            <Link to={`/edit/${PostInfo.postNum}`}>
                                <button className="edit">수정</button>
                            </Link>
                            <button className="delete" onClick={DeleteHandler}>삭제</button>
                        </BtnDiv>
                    </>
                ) :
                (
                    <SpinnerDiv>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </SpinnerDiv>
                )
            }
        </PostDiv>
    )
}

export default Detail