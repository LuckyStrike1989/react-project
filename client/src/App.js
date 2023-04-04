import './App.css';

import React from "react";
import { Routes, Route } from "react-router-dom";

import Test from './Test';
import Heading from './Component/Heading';
import List from './Component/Post/List';
import Upload from './Component/Post/Upload';
import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';

import Login from "./Component/User/Login";
import Register from './Component/User/Register';

function App() {
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
}

export default App;
