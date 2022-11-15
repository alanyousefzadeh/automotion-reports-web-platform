import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { useState, useEffect, useContext, createContext } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, type) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId)

  set(reference, {
    username: name,
    email: email,
    type: type
  })
}

function removeUserData(emailList) {
  console.log("test")
  const dbRef = ref(getDatabase());
  
  get(child(dbRef, `users/`  )).then((snapshot) => {
    snapshot.forEach((child) => {
      console.log(child.val().email)
      if(emailList.includes(child.val().email)){
        console.log("users/"+ child.ref._path.pieces_[1])
        //let path = "users/"+ child.ref._path.pieces_[1]
        const db = getDatabase();
        const reference = ref(db, 'users/' + child.ref._path.pieces_[1])
        remove(reference)
      }
    })
  });
  
}

export { writeUserData, removeUserData }
export const auth = getAuth(app)
export default app