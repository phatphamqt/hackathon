import React,{useState} from 'react'
import "firebase/firestore";
import firebase from 'firebase/app'

const db = firebase.firestore();
let user = []
let checkid = []
let checkpass = []

export function Signup(){
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
            createUser()
        }
    }

    console.log(id,pass)
    function createUser() {    
        if(id!=="" && pass !==""){
            if(checkid.indexOf(id)===-1){
                db.collection("newuser").add({
                    username: id,
                    password: pass,
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            } else {
                alert(`Username already exist, choose another username for example: ${id}123, ${id}abc, etc.`)
            }  
        } else { alert("username and password must not be blank")}
    }
    
    return (
            <div id="body">
                <div id="user">
                    <p style={{ textAlign: "center" }} >Sign up</p>
                    <div id="signup">
                        <div>
                    <label for="name">username</label>
                    <input 
                    id="name" 
                    onChange={handleInputu.bind(this)}/>
                    </div>
                    <div>
                    <label for="pass">password</label>
                    <input 
                    id="pass" 
                    type="password" 
                    onChange={handleInputp.bind(this)} onKeyDown={handleEnter.bind(this)} />
                    <button style={{ textAlign: "center" }} onClick={createUser.bind(this)} className="signup" >Sign up</button>
                    </div>  
                    </div>             
                </div>
            </div>
    )
}
