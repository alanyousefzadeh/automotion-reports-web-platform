import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, child, remove } from "firebase/database";

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

//function to add user to the real-time database
function writeUserData(userId, name, email, type) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId)
  set(reference, {
    username: name,
    email: email,
    type: type
  })
  console.log("user created")
}

//function to remove user from real-time database
function removeUserData(emailList) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/`)).then((snapshot) => {
    snapshot.forEach((child) => {
      if (emailList.includes(child.val().email)) {
        const db = getDatabase();
        const reference = ref(db, 'users/' + child.ref._path.pieces_[1])
        remove(reference)
      }
    })
  });
}

//function to modify user in the real-time database
function UpdateUserData(updatedUser) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/`)).then((snapshot) => {
    snapshot.forEach((child) => {
      console.log(child)
      if ((child.val().email) === updatedUser.oldEmail) {
        const db = getDatabase();
        let type = updatedUser.type
        const reference = ref(db, 'users/' + child.ref._path.pieces_[1])
        update(reference, {
          email: updatedUser.updatedEmail,
          type: type
        })
      }
    })
  });
}

async function isUserTech(currentAuthUserEmail, setIsTech){
  const dbRef = ref(getDatabase());
  // let isTech = null
  await get(child(dbRef, `users/`)).then((snapshot) => {
    snapshot.forEach((child) => {
      if ((child.val().email) === currentAuthUserEmail) {
        if(child.val().type === 'Tech'){
          setIsTech(true)
        }else{
          setIsTech(false)
        }
      }
    })
  });
  // return isTech
}

export { writeUserData, removeUserData, UpdateUserData, isUserTech}
export const auth = getAuth(app)
export default app