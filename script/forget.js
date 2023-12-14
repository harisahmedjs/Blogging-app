import { sendPasswordResetEmail   } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const forgot = document.querySelector('.forgot');

forgot.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.querySelector('.email').value; 

    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent successfully');
            Swal.fire({
                title: 'Email Sent!',
                text: 'The email has been successfully sent.',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              window.location = './index.html'
            })
            .catch((error) => {
                console.error('Error sending password reset email:', error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Please Check the email adress.',
                    icon: 'False',
                    confirmButtonText: 'OK'
                  });
            });
});

            forgot.value = ''