import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db} from "./config.js";
import {
    collection,
    getDocs,
    where,
    query,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


let uid = localStorage.getItem('userId')
let userId = JSON.parse(uid)
console.log(userId)
const home = document.querySelector('.p-div');
const logout = document.querySelector('#loged')
const div = document.querySelector('.rendering')
const image = document.querySelector('.s-image')
const email = document.querySelector('.email')
const name = document.querySelector('.name') 



onAuthStateChanged(auth,(user) => {
    // console.log(user.uid)
    if (!user) {
        console.log('not a user')
        home.innerHTML=`<button class = 's-btn'><a href="log.html"><i class="ri-login-box-line"></i></a></button>`
    }
});


// console.log (logout)

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'log.html';
    }).catch((error) => {
        console.log(error);
    });
});

const specificArr = []
const q = query(collection(db, "posts"), where("uid", "==", userId));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
// console.log(doc.data()) 
specificArr.push({ ...doc.data(), docId: doc.id })
 
});
console.log(specificArr)
specificArr.map((item)=>{
    email.innerHTML = `${item.userObj.Email}`
    name.innerHTML = `${item.userObj.name}`
 image.src = `${item.userObj.imageUrl}`
    let date = item.postDate.seconds;
    let daterender = new Date(date * 1000).toDateString();
div.innerHTML += `
<div class="render-data">
    <div class = 'r-div'>
    <div><img src=${item.userObj.imageUrl} alt='image' class = 'dash-image'></div>
    <div class = 'render-div'>
    <div><h2 class='r-title'>${item.Title}</h2></div>
    <div class = 'render-div1' >
    <p class='r-name'>${item.userObj.name}</p>&nbsp-
    <div><p class='r-date'>${daterender}</p></div>
    </div>
    </div>
    </div>
    <p class='r-description'>${item.Description}</p>
    </div>`

// console.log(item.userObj.imageUrl)
})