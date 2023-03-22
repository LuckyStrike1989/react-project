import React from 'react';
import { Form } from "react-bootstrap";
import axios from "axios";

function ImageUpload(props) {
    const FileUpload = (e) => {
        
        let formData = new FormData();
        formData.append("file", (e.target.files[0]));

        axios.post("/api/post/image/upload", formData).then(( response )=>{
            props.setImage(response.data.filePath);
        });
        
        //console.log(e.target.files);
        /*for(const keyValue of formData) {
            console.log(keyValue);
        }*/
        //console.log(formData.get("file"));
    }

    return (
        <div>
            <Form.Control type="file" className="shadow-none" accept="image/*" onChange={FileUpload}/>
            { (props.Image) ? <p>업로드 파일 : {props.Image}</p> : null }
        </div>
    )
}

export default ImageUpload;