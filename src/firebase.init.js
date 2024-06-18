import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAsFV_ADQnqe0izoAXIZqR4xkOz7XtCWm0",
  authDomain: "myhealth-792e7.firebaseapp.com",
  projectId: "myhealth-792e7",
  storageBucket: "myhealth-792e7.appspot.com",
  messagingSenderId: "437698324753",
  appId: "1:437698324753:web:be4c0ecf5851ed80d284b0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;