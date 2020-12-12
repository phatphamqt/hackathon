import React from 'react'
import {Edit} from './Edit'
import {Delete} from './Delete'
import {ProgressBar} from './ProgressBar'
import {EditComplete} from './EditComplete'
import "firebase/firestore";





export function Show(props){
    
    function Complete(e){
        let comp=e.target.parentElement.children[3]
        let compp=e.target.parentElement.children[4]
        if(comp.style.textDecoration === "none" && compp.style.textDecoration === "none"){
            comp.style.textDecoration = "line-through"
            compp.style.textDecoration = "line-through"
        } else {
            compp.style.textDecoration = "none"
            comp.style.textDecoration = "none"
        }
    }
    return <div className="list" key={props.i}  >
        <p style={{display:"none"}} >{props.i} </p>
        <p>Thời gian: {props.time}</p>
        <p> {props.id}</p>
        <p>Tiêu đề: {props.title}</p>
        <p className="content">Nội dung: {props.content}</p>
        <ProgressBar completed={props.completed} />
        <button onClick={Edit} >sửa</button>
        <button onClick={Delete} >xóa</button>
        <button onClick={EditComplete}>tiến độ</button>
        <button onClick={Complete} >hoàn thành</button>
    </div>
}