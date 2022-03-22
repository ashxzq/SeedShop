import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDVWZW_FlfEtpo8bDWMvvZTpH0XFBo5hXE",
    authDomain: "final-project-bec08.firebaseapp.com",
    projectId: "final-project-bec08",
    storageBucket: "final-project-bec08.appspot.com",
    messagingSenderId: "849180683647",
    appId: "1:849180683647:web:7f7ae6a6bcb16ee1423e4a"
};
// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app