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

//----------Initialize Firebase----------//
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const db = getDatabase();

//----------References----------//
const username = document.getElementById('username');
const password = document.getElementById('password');
const submit = document.getElementById('login');

//----------Authentication----------//
function AuthenticateUser() {
  const dbRef = ref(db);
  get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
    if (snapshot.exists()) {
      let dbpass = decPass(snapshot.val().password);
      if (dbpass == password.value) {
        login(snapshot.val());
      }
      else {
        alert("User does not exist!");
      }
    }
    else {
      alert("Username or Password is invalid")
    }
  })
}

//----------Decrypt password----------//
function decPass(dbpass) {
  var pass12 = CryptoJS.AES.decrypt(dbpass, password.value);
  return pass12.toString(CryptoJS.enc.Utf8);
}

// ------Login------//
function login(user) {
  localStorage.setItem('user', JSON.stringify(user));
  window.location = "../Page2_Requests/requests.html";
}

//----------Adding event listener----------//
submit.addEventListener("click", function (event) {
  AuthenticateUser();
});


//----------Window load----------//
window.onload = function () {
  let currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser !== null) {
    window.location = "../Page2_Requests/requests.html";
  }
}