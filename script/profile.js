import { updatePassword, onAuthStateChanged , signOut,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const image = document.querySelector('.image');
const nameUser = document.querySelector('.user-name');
const button = document.querySelector('.but');
const nPassword = document.querySelector('.c-password');
const rPassword = document.querySelector('.r-password');
const Password = document.querySelector('.password');
const logout = document.querySelector('.logout');

let userData;

const getUserData = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);

        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          nameUser.innerHTML = doc.data().name;
          image.src = doc.data().imageUrl;
        });

        resolve(user);
      } else {
        window.location = './index.html';
        reject(new Error('User not authenticated'));
      }
    });
  });
};

getUserData()
  .then((user) => {
    userData = user;
    console.log(userData); 
  })
  .catch((error) => {
    console.error(error);
  });

button.addEventListener('click', () => {
  if (nPassword.value != rPassword.value) {
    Swal.fire({
      title: "Password are not same",
      showClass: {
        popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
      },
      hideClass: {
        popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
      }
    });
    return
  
  } else {
    updatePassword(userData, nPassword.value)
      .then(() => {
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
          icon: "success",
          title: " Password changed successfully"
        });
      })
      .catch(() => {
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
          icon: "info",
          title: " Password are not changed successfully"
        });
      });
  }
nPassword.value = ''
rPassword.value = ''
Password.value = ''
});



logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("logout successfully");
      window.location = "log.html";
    })
    .catch((error) => {
      console.log(error);
    });
});