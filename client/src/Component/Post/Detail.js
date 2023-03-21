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

    return (
        <PostDiv>
            {
                Flag ?
                (
                    <>
                        <Post>
                            <h1>{PostInfo.title}</h1>
                            <p>{PostInfo.content}</p>   
                        </Post>
                        <BtnDiv>
                            <button className="list" 
                                    onClick={ (e)=>{
                                        e.preventDefault();
                                        navigate(-1);
                                    } }>목록</button>
                            <Link to={`/edit/${PostInfo.postNum}`}>
                                <button className="edit">수정</button>
                            </Link>
                            <button className="delete">삭제</button>
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