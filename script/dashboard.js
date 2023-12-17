import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  orderBy,
  where,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from "./config.js";

let docimage;
let docnam;
let userObj;
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // console.log(user);
    const uid = user.uid;
    // console.log(uid);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      userObj = doc.data();
      docimage = doc.data().imageUrl;
      docnam = doc.data().name;
      console.log(userObj);
      console.log(docimage);
      console.log(docnam);
    });

    // console.log(docnam);
    // Fetch and render user-specific posts
    getDataFromFirestore(uid);
  }
});

const title = document.querySelector(".title");
const des = document.querySelector(".description");
const btn = document.querySelector(".btn");
const card = document.querySelector(".rendering");
const logout = document.querySelector(".logout");
let arr = [];

// logout function
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

// render function
function renderpost() {
  card.innerHTML = "";

  arr.forEach((item) => {
    let date = item.postDate.seconds;
    let daterender = new Date(date * 1000).toDateString();
    card.innerHTML += `
    <div class="render-main">
    <div class = 'r-div'>
    <div><img src=${docimage} alt='image' class = 'dash-image'></div>
    <div class = 'render-div'>
    <div><h2 class='r-title'>${item.Title}</h2></div>
    <div class = 'render-div1' >
    <p class='r-name'>${docnam}</p>&nbsp-
    <div><p class='r-date'>${daterender}</p></div>
    </div>
    </div>
    </div>
        <p class='r-description'>${item.Description}</p>
        <div class = 'button-div'>
        <div><button type="button" id="delete"><i class="ri-delete-bin-2-line"></i></button></div>
        <div><button type="button" id="update"><i class="fa-regular fa-pen-to-square"></i></button><br></div>
  </div>
</div>`;
  });
  const del = document.querySelectorAll("#delete");
  const upd = document.querySelectorAll("#update");

  del.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("delete called", arr[index]);
      await deleteDoc(doc(db, "posts", arr[index].docId)).then(() => {
        console.log("post deleted");
        arr.splice(index, 1);
        renderpost();
      });
    });
  });
  upd.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("edit called", arr[index]);
      const updatedTitle = prompt("enter updated title", arr[index].Title);
      const updatedDes = prompt("enter updated title", arr[index].Description);
      await updateDoc(doc(db, "posts", arr[index].docId), {
        Title: updatedTitle,
        Description: updatedDes,
        time: Timestamp.fromDate(new Date()),
      });
      arr[index].Title = updatedTitle;
      arr[index].Description = updatedDes;
      renderpost();
    });
  });
}

// get data on firestore
async function getDataFromFirestore(uid) {
  // Clear the existing data in the array before fetching new data
  arr.length = 0;

  const querySnapshot = await getDocs(
    query(
      collection(db, "posts"),
      orderBy("postDate", "desc"),
      where("uid", "==", uid)
    )
  );
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docId: doc.id });

    console.log(arr);
  });

  renderpost();
}

// data post on firestore
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  const obj = {
    Title: title.value,
    Description: des.value,
    uid: auth.currentUser.uid,
    postDate: Timestamp.fromDate(new Date()),
    userObj,
  };

  try {
    await addDoc(collection(db, "posts"), obj);
    console.log("User registered successfully");

    // After posting, fetch and render the updated posts
    getDataFromFirestore(auth.currentUser.uid);
    renderpost();
  } catch (error) {
    console.error(error);
    // Handle errors, show messages, etc.
  }
  title.value = "";
  des.value = "";
});
