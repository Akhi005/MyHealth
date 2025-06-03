import { getFirestore} from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  databaseURL:import.meta.env.VITE_databaseURL,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId
};

const app = initializeApp(firebaseConfig);
export const db1 = getFirestore(app); 
export const auth = getAuth(app);