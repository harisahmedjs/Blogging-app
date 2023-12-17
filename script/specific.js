import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db} from "./config.js";


let uid = localStorage.getItem('userId')
let userId = JSON.parse(uid)
console.log(userId)



