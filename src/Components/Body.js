import React, { Fragment } from 'react'
import { Show } from './show'
import "firebase/firestore";
import firebase from 'firebase/app'
import { firebaseConfig } from '../config/firebase.config'

try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.log(e.message)
}

const db = firebase.firestore();

let how = []
let user = []
let checkid = []
let checkpass = []
let change = []
let bigid = []
const admin = ["admin"]
let date = new Date().toLocaleDateString()

export class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: "",
            da: "",
            pass: "",
            user: user,
            checkid: checkid,
            checkpass: checkpass,
            correct: "",
            change: change,
        }
    }

    componentDidMount() {

        db.collection("todo")
            .get()
            .then((onSnapshot) => {
                onSnapshot.forEach((doc) => {
                    how.push(doc.data())
                    bigid.push(doc.id)
                });
                this.setState({ list: how })
                for (let i = 0; i < how.length; i++) {
                    how[i].bigid = bigid[i]
                }

            });


        db.collection("newuser")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                    user.push(doc.data())
                    checkid.push(doc.data().username)
                    checkpass.push(doc.data().password)
                })
            })

    }
    Check() {
        if (this.state.checkid.indexOf(this.state.da) === this.state.checkpass.indexOf(this.state.pass)) {
            alert("welcome!")
            this.setState({ correct: this.state.da })
        } else {
            alert("username or password is incorrect")
            console.log(this.state.da, this.state.pass)

            this.setState({ correct: 0 })
        }
    }

    handleInputu(e) {
        console.log(e.target.value)

        this.setState({ da: e.target.value })
    }
    handleInputp(e) {
        this.setState({ pass: e.target.value })
    }
    handleEnter(e) {
        if (e.key === "Enter") {
            this.Check()
        }
    }
    createNew() {
        let i = prompt("input id:")
        let tile = prompt("input title:")
        let cont = prompt("input content:")
        let comp = prompt("input complete:")
        db.collection("todo").add({
            id: i,
            title: tile,
            content: cont,
            time: date,
            completed: comp
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                db.collection("todo").doc(docRef.id)
                    .onSnapshot(function (doc) {
                        console.log("Current data: ", doc.data());
                    });

            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });


        db.collection("todo")
            .get()
            .then((onSnapshot) => {
                onSnapshot.forEach((doc) => {
                    if (bigid.indexOf(doc.id) === -1) {
                        how.push(doc.data())
                        bigid.push(doc.id)
                    }
                }
                );
                this.setState({ list: how })
                for (let i = 0; i < how.length; i++) {
                    how[i].bigid = bigid[i]
                }

            });


    }

    render() {

        console.log(this.state.list)
        console.log(this.state)
        console.log(this.state.change)
        let showthis = ""
        let li = []
        for (let i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].id === this.state.correct) {
                li.push(this.state.list[i])
                showthis = li.map(l => {
                    return (
                        <Show completed={l.completed} time={l.time} id={l.id} title={l.title} content={l.content} />
                    )
                })
            } if (this.state.correct === admin[0]) {

                li.push(this.state.list[i])
                showthis = li.map(l => {
                    return (
                        <Show completed={l.completed} time={l.time} i={l.bigid} id={l.id} title={l.title} content={l.content} />
                    )
                })
            }
        }


        return <Fragment>
            <div id="body">
                <div id="user">
                    <p style={{ textAlign: "center" }} >Đăng nhập ở đây nè </p>
                    <div id="signup">
                        <div>
                            <label for="name">Tên đăng nhập: </label>
                            <input id="name" onChange={this.handleInputu.bind(this)}  ></input>
                        </div>
                        <div>
                            <label for="pass">Mật khẩu: </label>
                            <input id="pass" type="password" onChange={this.handleInputp.bind(this)} onKeyDown={this.handleEnter.bind(this)} ></input>
                            <button className="signin" onClick={this.Check.bind(this)} >VÀO</button>
                        </div>
                    </div>
                </div>
                <div id="info">
                    <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "x-large" }} >Info</p>
                    <div id="det">
                        {showthis}
                    </div>
                    <button id="add" onClick={this.createNew.bind(this)} >THÊM</button>
                </div>
            </div>
        </Fragment>
    }
}