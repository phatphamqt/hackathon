
import "firebase/firestore";
import firebase from 'firebase/app'
import { firebaseConfig } from '../config/firebase.config'


try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.log(e.message)
}


const db = firebase.firestore();

export function Edit(e){
    // let newcont=prompt("Input new content: ")
    console.log(e.target.parentElement.children[0].innerHTML)
    console.log(e.target.parentElement)
    // props.push(e.target.parentElement.children[2].innerHTML)
    // let id = prompt("input id fix:")
    let bigid = e.target.parentElement.children[0].innerHTML
    let neee=bigid.replace(" ","")
    var todoRef = db.collection("todo").doc(neee);
    let newcont = prompt("input new content")
    
    return todoRef.update({
        content: newcont
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}