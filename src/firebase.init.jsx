import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIiQIxiEIrT9-M5WeUR2cCuobCEP4EO1Y",
  authDomain: "doctor-portals-dd6eb.firebaseapp.com",
  projectId: "doctor-portals-dd6eb",
  storageBucket: "doctor-portals-dd6eb.appspot.com",
  messagingSenderId: "254959589028",
  appId: "1:254959589028:web:31f6237656f14f1f4a3831"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
