import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const currentTime = new Date();
const currentHour = currentTime.getHours();
const home = document.querySelector('.home-div2');
const logout = document.querySelector('#loged')

onAuthStateChanged(auth,(user) => {
    if (!user) {
        console.log('not a user')
        home.innerHTML=`<button><a href="log.html"><i class="ri-login-box-line"></i></a></button>`
        console.log (logout)
        
    }
});


// console.log(logout)

    

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