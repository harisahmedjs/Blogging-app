import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db} from "./config.js";
import { collection, getDocs,where,Timestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const currentTime = new Date();
const currentHour = currentTime.getHours();
const home = document.querySelector('.p-div');
const logout = document.querySelector('#loged')

onAuthStateChanged(auth,(user) => {
    if (!user) {
        console.log('not a user')
        home.innerHTML=`<button class = 'p-btn'><a href="log.html"><i class="ri-login-box-line"></i></a></button>`
    }
});

console.log (logout)

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'log.html';
    }).catch((error) => {
        console.log(error);
    });
});


// time start
let greeting;
if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning'
} else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon'
} else if (currentHour >= 17 && currentHour < 21) {
    greeting = 'Good Evening';
} else {
    greeting = 'Good Night';
}
console.log(greeting);
// const text = document.createTextNode(`${greeting} Raaders!`)
// time.appendChild(text)
const div =document.querySelector('.home-nav')
div.innerHTML = `<h2 class='div-h2'>${greeting} Readers!</h2>`

// time end

const homeDiv = document.querySelector('#home-div3')


let globalAryy = []

const postsQuerySnapshot = await getDocs(collection(db, "posts"));
postsQuerySnapshot.forEach((doc) => {
    globalAryy.push({ ...doc.data(), docId: doc.id });
// console.log (globalAryy)
});

globalAryy.map( async(item)=>{
console.log(item.userObj.imageUrl)
    const usersQuerySnapshot = await getDocs(collection(db, "users"), where('uid', '==', item.userObj.uid));
    console.log(usersQuerySnapshot)
    const timestamp = Math.floor(new Date().getTime() / 1000); // Get current Unix timestamp in seconds
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    const daterender = date.toLocaleDateString(); // Format the date as a string
    
    console.log(daterender);

    homeDiv.innerHTML += `
    <img src=${item.userObj.imageUrl} alt='image'>
<h3 class='r-name'>${item.userObj.name}</h3>
<p class='r-date'>${daterender}</p>
<p class='r-title'>${item.Title}</p>
<p class='r-description'>${item.Description}</p>`

})