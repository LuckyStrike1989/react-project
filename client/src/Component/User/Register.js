import React, {useState} from 'react'
import { LoginDiv } from '../../Style/UserCSS.js';

function Register() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfirm, setPasswordConfirm] = useState("");

    return (
        <LoginDiv>
            <form>
                <label>이름</label>
                <input type="name" name="name" value={Name} onChange={(e) => setName(e.currentTarget.value)}/>
                <label>이메일</label>
                <input type="email" name="email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                <label>비밀번호</label>
                <input type="password" name="password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                <label>비밀번호 확인</label>
                <input type="password" name="password" value={PasswordConfirm} onChange={(e) => setPasswordConfirm(e.currentTarget.value)}/>
                <button>회원가입</button>
            </form>
        </LoginDiv>
    );
}

export default Register