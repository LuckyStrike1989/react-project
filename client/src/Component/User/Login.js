import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginDiv } from '../../Style/UserCSS.js';

import firebase from '../../firebase.js';

function Login() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMsg, setErrorMsg] = useState("");

    let navigate = useNavigate();

    const SignInFunc = async (e) => {
        e.preventDefault();

        if( !(Email && Password) ) {
            return alert('모든 값을 채워주세요.');
        }

        try {
            await firebase.auth().signInWithEmailAndPassword(Email, Password);
            navigate("/");
        } catch (error) {
            if( error.code === "auth/user-not-found" ) {
                setErrorMsg("존재하지 않는 이메일입니다.");
            } else if( error.code === "auth/wrong-password" ) {
                setErrorMsg("비밀번호가 일치하지 않습니다.");
            } else {
                setErrorMsg("로그인이 실패하였습니다.");
            }
        }
    }

    useEffect(() => {
        setTimeout(()=>{
            setErrorMsg("");
        }, 5000);
    }, [ErrorMsg]);

    const moveRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    };

    return (
        <LoginDiv>
            <form>
                <label>이메일</label>
                <input type="email" name="email" value={Email} required onChange={(e) => setEmail(e.currentTarget.value)}/>
                <label>비밀번호</label>
                <input type="password" name="password" value={Password} required onChange={(e) => setPassword(e.currentTarget.value)}/>
                {ErrorMsg != "" && <p>{ErrorMsg}</p>}
                <button onClick={(e) => { SignInFunc(e) }}>로그인</button>
                <button onClick={(e) => { moveRegister(e) }}>회원가입</button>
            </form>
        </LoginDiv>
    );
}

export default Login