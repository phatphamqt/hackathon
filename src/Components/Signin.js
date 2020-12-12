import React,{useState} from 'react'
import "firebase/firestore";
import firebase from 'firebase/app'
import { Redirect } from 'react-router-dom';


const db = firebase.firestore();
let user = []
let checkid = []
let checkpass = []
let loggedin=false
export function Signin(){
    const [id,setId] = useState("")
    const [pass,setPass] = useState("")
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

    function handleInputu(e) {
        setId(e.target.value)
    }
    function handleInputp(e) {
        setPass(e.target.value)
    }
    function handleEnter(e) {
        if (e.key === "Enter") {
            Check()
        }
    }
    function Check() {
        if (checkid.indexOf(id) === checkpass.indexOf(pass)) {
            alert("welcome!")
            loggedin=true
            console.log(loggedin)
                return <Redirect to={{
                    pathname:"/body",
                    state: {lid:id}
            }}/>
        } else {
            alert("username or password is incorrect")

        }
    }
    console.log(id,pass)
    
    
    return (
        <div>
            <div id="body">
                <div id="user">
                    <p style={{ textAlign: "center" }} >Sign in</p>
                    <br />
                    <label for="name">username</label>
                    <input 
                    id="name" 
                    onChange={handleInputu.bind(this)}/>
                    <br /><br />
                    <label for="pass">password</label>
                    <input 
                    id="pass" 
                    type="password" 
                    onChange={handleInputp.bind(this)} onKeyDown={handleEnter.bind(this)} />
                    <button style={{ textAlign: "center" }} className="signin" >Sign in</button>
                    <p style={{ textAlign: "center" }} >Instruction:</p>
                    <p>- Press "Sign up" to create new user</p>
                    <p>- Press "Add" to add new objective to your to do list</p>
                    <p>- Press "Edit,Delete" to edit or delete specific item (require page refresh to take effects)</p>
                    <button >Go to your todo list</button>
                </div>
            </div>
        </div>
    )
}
