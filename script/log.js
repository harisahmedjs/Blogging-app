import { signInWithEmailAndPassword ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const email = document.querySelector('.email');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');

// onAuthStateChanged(auth,(user) => {
//   if (user) {
//       console.log(user);
//     window.location= './home.html'
//   }
// });

btn.addEventListener('click',(event)=>{
    event.preventDefault();
    // console.log(email.value);
    // console.log(password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
   window.location= '/Dashboard.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: `${errorMessage}`
    });
  })
  email.value = ''
  password.value = ''
})