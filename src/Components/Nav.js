import React from 'react'
import { Link } from 'react-router-dom'
import { Time } from './Time'

export function Nav(){
    return<div>
    <div id="header">
    <div id="left">
        <h3>TO DO APP</h3>
    </div>
    <div id="sidehead">
        <Link to="/Intro">
            <p>Hướng dẫn</p>
            </Link>
        <Link to="/Body">
            <p>Đăng nhập</p>
        </Link>
        <Link to="/Signup">
            <p>Đăng kí</p>
        </Link>
        <Link to="/about">
            <p>Về ứng dụng</p>
        </Link>
    </div>
    </div>
    <div><Time/></div>
</div>
}