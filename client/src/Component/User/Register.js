import React, {useState} from 'react'
import { LoginDiv } from '../../Style/UserCSS.js';

import firebase from "../../firebase.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfirm, setPasswordConfirm] = useState("");
    const [Flag, setFlag] = useState(false);

    let navigate = useNavigate();

    const RegisterFunc = async (e) => {
        setFlag(true);

        e.preventDefault();

        if( !(Name && Email && Password && PasswordConfirm) ) {
            return alert("모든 값을 채워주세요!");
        }

        if( Password !== PasswordConfirm ) {
            return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
        }
        
        let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Password);
        
        await createdUser.user.updateProfile({
            displayName: Name
        });

        let body = {
            email : createdUser.user.multiFactor.user.email,
            displayName : createdUser.user.multiFactor.user.displayName,
            uid : createdUser.user.multiFactor.user.uid
        }

        axios.post("/api/user/register", body)
            .then((response) => {
                setFlag(false);

                if( response.data.success ) { 
                    // 회원가입 성공시
                    navigate("/login");
                } else {
                    // 회원가입 실패시
                    return alert("회원가입이 실패하였습니다.");
                }
            }).catch((err) => {
                console.log(err);
            });
    };

    return (
        <LoginDiv>
            <form>
                <label>이름</label>
                <input type="name" name="name" value={Name} onChange={(e) => setName(e.currentTarget.value)}/>
                <label>이메일</label>
                <input type="email" name="email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                <label>비밀번호</label>
                <input type="password" name="password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)} minLength={8}/>
                <label>비밀번호 확인</label>
                <input type="password" name="password" value={PasswordConfirm} onChange={(e) => setPasswordConfirm(e.currentTarget.value)} minLength={8}/>
                <button onClick={(e) => {RegisterFunc(e)}} disabled={Flag}>회원가입</button>
            </form>
        </LoginDiv>
    );
}

export default Register