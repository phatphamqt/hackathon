import React from 'react'
import {Edit} from './Edit'



export function Show(props){
    
    return <div className="list">
        <p style={{display:"none"}} >{props.i} </p>
        <br/>
        Title: {props.title} 
        <p className="content">Content: {props.content}</p>
        <button onClick={Edit} >edit</button>
    </div>
}