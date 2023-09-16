//----------Connect to firebase----------//
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnSLmidHzUy_TSU26r1oA2GW8HrCj8G8c",
  authDomain: "software-license-managem-bbb5f.firebaseapp.com",
  databaseURL: "https://software-license-managem-bbb5f-default-rtdb.firebaseio.com",
  projectId: "software-license-managem-bbb5f",
  storageBucket: "software-license-managem-bbb5f.appspot.com",
  messagingSenderId: "558942243393",
  appId: "1:558942243393:web:aaa3488d05d8b1b06414c0"
};

//----------Initialize Firebase----------//
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const db = getDatabase();

//----------Generate random id----------//
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const form = document.getElementById('ReqForm');

form.addEventListener("submit", (e) => {
  e.preventDefault();

//----------Get the form data----------//
  let currentUser = JSON.parse(localStorage.getItem('user'))
  const userId = currentUser.userId
  const fullname = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const department = document.getElementById('department').value;
  const selectedSoftware = document.getElementById('selected_software').value;
  const otherSoftware = document.getElementById('others_software').value;
  const purpose = document.getElementById('purpose').value;
  const hostName = document.getElementById('host_name').value;
  const userRemarks = document.getElementById('user_remarks').value;
  const date = new Date();
  
//----------Object with the form data----------//
  const formData = {
    userId,
    fullname,
    location,
    department,
    selectedSoftware,
    otherSoftware,
    purpose,
    hostName,
    userRemarks,
    createDate: date.toLocaleDateString(),
    status: 0,
    stateUpdateDate: date.toLocaleDateString(),
  };

//----------Pushing data to Firebase----------//
  const random_uuid = uuidv4();

  set(ref(db, "FormData/" + random_uuid), formData)
    .then(() => {
      console.log("Data sent to Firebase successfully");
    })
    .catch((error) => {
      console.error("Error sending data to Firebase:", error);
    });

 //----------Display success message----------//
  const mask_submit = document.querySelector('.mask_submit');
  mask_submit.style.display = "block"

  setTimeout(() => {
    mask_submit.style.display = "none";
  }, 1000);
  form.reset()
  document.getElementById('name').value = currentUser.fullname;
  document.getElementById('location').value = currentUser.location;
  document.getElementById('department').value = currentUser.department;

//----------direct to view status page----------//
  setTimeout(() => {
    window.location.replace("../Page4_ViewStatus/ViewStatus.html");
  }, 2000);
  
});

//----------window onLoad function----------//
window.onload = function () {
  let currentUser = JSON.parse(localStorage.getItem('user'))
  document.getElementById('name').value = currentUser.fullname;
  document.getElementById('location').value = currentUser.location;
  document.getElementById('department').value = currentUser.department;
}
