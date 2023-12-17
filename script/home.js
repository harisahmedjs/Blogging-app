import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db} from "./config.js";
import { collection, getDocs,where,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const currentTime = new Date();
const currentHour = currentTime.getHours();
const home = document.querySelector('.p-div');
const logout = document.querySelector('#loged')

onAuthStateChanged(auth,(user) => {
    // console.log(user.uid)
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

const div =document.querySelector('.home-nav')
div.innerHTML = `<h2 class='div-h2'>${greeting} Readers!</h2>`

// time end

const homeDiv = document.querySelector('#home-div3')


let globalAryy = []

const postsQuerySnapshot = await getDocs(collection(db, "posts"));
postsQuerySnapshot.forEach((doc) => {
    // console.log(doc.data());
    globalAryy.push({ ...doc.data(), docId: doc.id });

});

globalAryy.map( async(item)=>{
console.log(item.userObj.imageUrl)
    const usersQuerySnapshot = await getDocs(collection(db, "users"),  where('uid', '==', item.userObj.uid))
    console.log(usersQuerySnapshot)
    const timestamp = Math.floor(new Date().getTime() / 1000); 
    const date = new Date(timestamp * 1000); 
    const daterender = date.toLocaleDateString(); 
    
    console.log(daterender);

    homeDiv.innerHTML += 
    `<div class="render-main">
    <div class = 'r-div'>
    <div><img src=${item.userObj.imageUrl} alt='image' class = 'dash-image'></div>
    <div class = 'render-div'>
    <div><h2 class='r-title'>${item.Title}</h2></div>
    <div class = 'render-div1' >
    <p class='r-name'>${item.userObj.name}</p>&nbsp_
    <div><p class='r-date'>${daterender}</p></div>
    </div>
    </div>
    </div>
        <p class='r-description'>${item.Description}</p>
        <div>
        <p class='delete'>see all blogs from this user</p>
        </div>
</div>`



const del = document.querySelectorAll('.delete')
 
del.forEach((item , index)=>{
    item.addEventListener('click' , async()=>{
        console.log(`delete called ==> ${globalAryy[index].uid}`)
        const uid = JSON.stringify(globalAryy[index].uid)
       localStorage.setItem('userId' , uid);
       window.location = './specific.html'
    })
});

})
