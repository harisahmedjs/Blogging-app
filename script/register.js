import {  createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db , storage} from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const input = document.querySelector('.username')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const confirmPassword = document.querySelector('.c-password')
const button = document.querySelector('.btn')
const Photo = document.querySelector('.img');
console.log(Photo)
button.addEventListener('click',async()=>{
    
//    console.log(input.value)
//    console.log(email.value)
//    console.log(password.value)
//    console.log(confirmPassword.value)

if (email.value === '' || password.value === '' || confirmPassword.value === '' || input.value === '' || Photo.value === '') {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please complete all fields.',
        confirmButtonText: 'OK'
    });
    return;
}

try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    console.log(user);

    const files = Photo.files[0];
    const storageRef = ref(storage, input.value);

    await uploadBytes(storageRef, files);
    
    // Get the download URL once the file is uploaded
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "users"), {
        name: input.value,
        Email: email.value,
        uid: user.uid,
        imageUrl: url , 
        userPassword : password.value
    });

    console.log('User registered successfully');
    window.location = 'index.html';
} catch (error) {
    console.error(error);

    // Handle errors, show messages, etc.
}
input.value = ''
email.value = ''
password.value = ''
confirmPassword.value = ''
Photo.value = ''
});
