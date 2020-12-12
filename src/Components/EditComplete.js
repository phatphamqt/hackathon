
import "firebase/firestore";
import firebase from 'firebase/app'
import { firebaseConfig } from '../config/firebase.config'

try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.log(e.message)
}


const db = firebase.firestore();

export function EditComplete(e){

    console.log(e.target.parentElement.children[0].innerHTML)

    let bigid = e.target.parentElement.children[0].innerHTML
    let neee=bigid.replace(" ","")
    var todoRef = db.collection("todo").doc(neee);
    let newcomp = prompt("input new complete")
    
    return todoRef.update({
        completed: newcomp
    })
        .then(function () {
            console.log("Document successfully updated!");
            alert("Refresh and then sign in again to see changes.")
            db.collection("todo").doc(neee)
                    .onSnapshot(function (doc) {
                        console.log("Current data: ", doc.data());
                    });

        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

}