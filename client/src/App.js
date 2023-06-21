import './App.css';

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice.js';
import firebase from "./firebase.js";

import Test from './Test';
import Heading from './Component/Heading';
import List from './Component/Post/List';
import Upload from './Component/Post/Upload';
import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';

import Login from "./Component/User/Login";
import Register from './Component/User/Register';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
      firebase.auth().onAuthStateChanged((userInfo) => {
        if( userInfo !== null ) {
          dispatch(loginUser(userInfo.multiFactor.user));
        } else {
          dispatch(clearUser());
        }
      });
    }, []);

    return (
      <>
        <Heading />
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/list" element={<List />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:postNum" element={<Detail />} />
          <Route path="/edit/:postNum" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    );

    /*let Flag = true;
    let Arr = ['이근원', '홍길동', '임꺽정'];

    return (
      <div>
        <h1>Hello, React!</h1>
        {Flag ? "참입니다" : "거짓입니다"}
        {
          Arr.map((value, index) => {
            return (
              <div key={index}>
                <p>{index}</p>
                <p>{value}</p>
              </div>
            );
          })
        }
      </div>
    );*/
}

export default App;
