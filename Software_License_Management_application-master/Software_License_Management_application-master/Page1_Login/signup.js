//----------Firebase configuration----------//
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

const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const db = getDatabase();

//----------References----------//
const name = document.getElementById('name');
const username = document.getElementById('username');
const password = document.getElementById('password');
const location = document.getElementById('location');
const department = document.getElementById('department');
const submit = document.getElementById('submit');

//----------Random user id generator----------//
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

//----------Validation----------//
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function Validation() {
  if (isEmptyOrSpaces(name.value) || isEmptyOrSpaces(username.value) || isEmptyOrSpaces(password.value) || isEmptyOrSpaces(location.value) || isEmptyOrSpaces(department.value)) {
    alert("You cannot leave any field empty");
    return false;
  }
  return true;
}

//----------Register to Firebase----------//
function RegisterUser() 
{
  if (!Validation()) {
    return;
  }

  const dbRef = ref(db);
  get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
    if (snapshot.exists()) {
      alert("Account already exists! Use another username.");
    }
    else {
      set(ref(db, "UsersList/" + username.value),
        {
          userId: uuidv4(),
          fullname: name.value,
          username: username.value,
          password: encPass(),
          location: location.value,
          department: department.value,
          role: 1
        })
        .then(() => {
          alert("User added successfully")
          name.value = "";
          username.value = "";
          password.value = "";
          location.value = "";
          department.value = "";
        })
        .catch((error) => {
          alert(`Error adding user ${error}`)
        })

    }
  })
  setTimeout(() => {
    window.location.replace("login.html");
  }, 2500);
}

//----------Encryption----------//
function encPass() {
  var pass12 = CryptoJS.AES.encrypt(password.value, password.value);
  return pass12.toString();
}

//----------Adding event listener----------//
submit.addEventListener("click", function (event) {
  RegisterUser();
});

window.onload = function () {
  let currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser !== null) {
    window.location = "../Page2_Requests/requests.html";
  }
}