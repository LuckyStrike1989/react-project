import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginDiv } from '../../Style/UserCSS.js';

function Login() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    let navigate = useNavigate();

    const moveRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    };

    return (
        <LoginDiv>
            <form>
                <lable>이메일</lable>
                <input type="email" name="email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                <lable>비밀번호</lable>
                <input type="password" name="password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                <button>로그인</button>
                <button onClick={moveRegister}>회원가입</button>
            </form>
        </LoginDiv>
    );
}

export default Login