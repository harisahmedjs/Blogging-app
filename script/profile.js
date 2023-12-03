import {  updatePassword , onAuthStateChanged} from  "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth , db } from "./config.js";
import { collection, getDocs , query,where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const div = document.querySelector('.main')
const image = document.querySelector('.image')
const nameUser = document.querySelector('.user-name')
const button = document.querySelector('.btn')
const nPassword = document.querySelector('.c-password')
const rPassword = document.querySelector('.r-password')
const password = document.querySelector('.password')



onAuthStateChanged(auth, async(user) => {
      if (user) {
      
        const uid = user.uid;
        console.log(uid)
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
//   console.log(doc.data());
   nameUser.innerHTML = doc.data().name
   image.src = doc.data().imageUrl

});
      } else {
        window.location='./index.html'
      }
    });







button.addEventListener('click',()=>{
    // console.log(image)
    // console.log(nameUser)
    // console.log(password)
    // console.log(rPassword)
    // console.log(cPassword)

    const user = auth.currentUser;

    if (user) {
          const newPassword = nPassword.value; // Replace with the new password
    
          // Update the password
          updatePassword(user, newPassword)
                .then(() => {
                      console.log('Password updated successfully');
                })
                .catch((error) => {
                      console.error('Error updating password:', error.message);
                });
    } else {
          console.error('No user is currently signed in');
    }
    
 

})
