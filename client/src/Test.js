import React, { useState } from 'react'

function Test() {
    /*
     1. 첫번째 인자 : 변수의 이름
     2. 두번째 인자 : state를 바꿔주는 함수
     3. useState 함수 인자 : state의 초기 Type, 값 

     state의 값이 바뀌어도 화면을 재랜더링(새로고침)시킬 필요가 X

     1. state의 값을 바꿀때는 항상 setState 사용!
     2. setState를 html 태그의 on 속성 호출 : function(){}
     */

    const [Temp, setTemp] = useState(0);
    const [arrTemp, setArrTemp] = useState([]);
    const [Number, setNumber] = useState(0);
    const [Flag, setFlag] = useState(true);
    const [Content, setContent] = useState("");
    const [ContentList, setContentList] = useState([]);

    const tempCounter = () => {
        setTemp(Temp + 1);
    }

    const addArrayTemp = () => {
        let arr = [];
        arr = [...arrTemp]; // 배열 복사
        arr.push(Number);
        setNumber(Number + 1);
        setArrTemp([...arr]);
    }

    const reverseFalg = () => {
        setFlag(!Flag);
    }
    
    const onSubmit = () => {
        let tempArr = [...ContentList];
        tempArr.push(Content);
        setContentList([...tempArr]);
        setContent("");
    }

    const getCurrentTargetValue = (e) => {
        setContent(e.currentTarget.value);
    }

    return (
        <div className="initLayout">
            <h1 className="title">Test Component 입니다.</h1>

            {
                ContentList.map((items, index) => {
                    return (
                        <div key={index} className="contentList">
                            내용 : {items}
                            <hr/>
                        </div>
                    );
                })
            }

            <input type="text" value={Content} onChange={getCurrentTargetValue}/><br/>
            <button className="marginTop1rem" onClick={onSubmit}>제출</button><br/>

            {Temp}<br/>

            <button onClick={tempCounter}>증가</button><br/>

            <button onClick={addArrayTemp}>추가</button><br/>
            {
                arrTemp.map((value, index) => {
                    return (
                        <div key={index}>
                            <p>{value}</p>
                        </div>
                    );
                })
            }

            <button onClick={reverseFalg}>{Flag ? "숨기기" : "보기"}</button>
            {Flag ? <h1 className="title">Test 컴퓨넌트입니다!</h1> : null}
        </div>
    )
}

export default Test