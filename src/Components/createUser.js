
import "firebase/firestore";
import firebase from 'firebase/app'



const db = firebase.firestore();

export function createUser() {
    let acc = prompt("input id:")
    let pass = prompt("input password:")
    
    db.collection("newuser").add({
        username: acc,
        password: pass,
    })
        // .then(function (docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function (error) {
        //     console.error("Error adding document: ", error);
        // });

}