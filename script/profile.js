import { updatePassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const image = document.querySelector('.image');
const nameUser = document.querySelector('.user-name');
const button = document.querySelector('.but');
const nPassword = document.querySelector('.c-password');
const rPassword = document.querySelector('.r-password');

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
    console.log(userData); // auth.currentUser is now accessible here
  })
  .catch((error) => {
    console.error(error);
  });

button.addEventListener('click', () => {
  if (nPassword.value != rPassword.value) {
    alert('Passwords do not match');
  } else {
    updatePassword(userData, nPassword.value)
      .then(() => {
        alert('Password change successful');
      })
      .catch(() => {
        alert('Error changing password');
      });
  }
nPassword.value = ''
rPasswordPassword.value = ''
});
