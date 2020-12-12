
import "firebase/firestore";
import firebase from 'firebase/app'


const db = firebase.firestore();

export function Delete(e){
    console.log(e.target.parentElement.children[0].innerHTML)
    console.log(e.target.parentElement)
    let bigid = e.target.parentElement.children[0].innerHTML
    let neee=bigid.replace(" ","")
    var todoRef = db.collection("todo").doc(neee);
    return todoRef.delete()   
}