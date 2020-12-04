import React, { Fragment } from 'react'
import { Show } from './show'
import "firebase/firestore";
import firebase from 'firebase/app'
import { firebaseConfig } from '../config/firebase.config'
import {createUser} from './createUser'


try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.log(e.message)
}


const db = firebase.firestore();

let how = []
let user=[]
let checkid=[]
let checkpass=[]
let change=[]
let bigid=[]

export class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: how,
            da:"",
            pass:"",
            user:user,
            checkid:checkid,
            checkpass:checkpass,
            correct:"",
            change:change
        }

    }

    componentDidMount() {
        db.collection("todo")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                // console.log(doc.data().title)
                    how.push(doc.data())
                    bigid.push(doc.id)

            });
            for(let i=0;i<how.length;i++){
                how[i].bigid=bigid[i]
            }

        });
        db.collection("newuser")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                user.push(doc.data())
                checkid.push(doc.data().username)
                checkpass.push(doc.data().password)
            })     
        })       

    }
    Check(){
        if(this.state.checkid.indexOf(this.state.da) === this.state.checkpass.indexOf(this.state.pass)){
               alert("welcome!")
                this.setState({correct:this.state.da})
        } else {
                alert("username or password is incorrect")
                this.setState({correct:0})
        }
    } 

    handleInputu(e){
        console.log(e.target.value)
        // if(e.key==="Enter"){
            this.setState({ da:e.target.value})    
        // }    
    }
    handleInputp(e){
        console.log(e.target.value)
        if(e.key==="Enter"){
            this.setState({ pass:e.target.value})    
            this.Check()
        }    
    }        
    createNew() {
        let i = prompt("input id:")
        let tile = prompt("input title:")
        let cont = prompt("input content:")
        db.collection("todo").add({
            id: i,
            title: tile,
            content: cont
        })
            // .then(function (docRef) {
            //     console.log("Document written with ID: ", docRef.id);
            // })
            // .catch(function (error) {
            //     console.error("Error adding document: ", error);
            // });

    }

    render() {
        console.log(this.state.list)
        console.log(this.state)
        console.log(this.state.change)
        let showthis=""
        let li=[]
        for(let i =0;i< this.state.list.length;i++){
            if(this.state.list[i].id===this.state.correct){
                li.push(this.state.list[i])
                showthis = li.map(l => {
                    return (
                        <Show i={l.bigid} id={l.id} title={l.title} content={l.content} />
                    )
                })
            }
        }


        return <Fragment>
        <div id="header">
            <div id="left">
                <h3>TO DO APP</h3>
            </div>
            <div id="sidehead">

                <p onClick={createUser} >Sign up</p>
                <p >About</p>
                
            </div>
        </div>
        <div id="body">
            <div id="user">
                <p style={{textAlign:"center"}} >Sign in</p><br/>
                <label for="name">username</label>
                <input id="name" onKeyDown={this.handleInputu.bind(this)}  ></input><br/><br/>
                <label for="pass">password</label>
                <input id="pass" type="password" onKeyDown={this.handleInputp.bind(this)} ></input>
                <p style={{textAlign:"center"}} >Instruction:</p>
                <p>- Fill in the username and password field and press enter to sign in</p>
                <p>- Press "Sign up" to create new user</p>
                <p>- Press "Add" to add new objective to your to do list</p>
                <p>- Press "Edit" to edit specific item</p>
            </div>
            <div id="info">
                <p style={{textAlign:"center"}} >Info</p>
                <div id="det">
                    {showthis}
                </div>
                <button id="add" onClick={this.createNew.bind(this)} >Add</button>
            </div>
        </div>
        </Fragment>
    }
}

