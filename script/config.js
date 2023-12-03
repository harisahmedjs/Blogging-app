import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyCoCUIKI_VdiXEPzoTHVXuLQLiYS9ixhiw",
    authDomain: "haris-blogging.firebaseapp.com",
    projectId: "haris-blogging",
    storageBucket: "haris-blogging.appspot.com",
    messagingSenderId: "537371259151",
    appId: "1:537371259151:web:21de7ac2cd87982540ce7a",
    measurementId: "G-0HLM701Y1N"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);