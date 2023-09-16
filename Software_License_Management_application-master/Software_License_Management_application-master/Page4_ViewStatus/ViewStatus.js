// -----------Connect to firebase--------------//
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

import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

function getAllDataOnce() 
{
  const db = getDatabase();
  const starCountRef = ref(db, 'FormData');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    let currentUser = JSON.parse(localStorage.getItem('user'))
    for (const key in data) {
      if (data[key].userId === currentUser.userId) {
        let string = `
        <tr>
          <td>${key}</td>
          <td>${data[key].selectedSoftware}</td>
          <td>${data[key].otherSoftware}</td>
          <td>${data[key].purpose}</td>
          <td>${data[key].hostName}</td>
          <td>${data[key].createDate}</td>
          <td>${data[key].fullname}</td>
          <td>${data[key].status === 0 ? 'Pending' : data[key].status === 1 ? 'Approved' : 'Rejected'}</td>
          <td>${data[key].stateUpdateDate}</td>
          <td>${data[key].userRemarks}</td>
        </tr>
      `
        document.getElementById("tbody").innerHTML = document.getElementById("tbody").innerHTML + string;
      }
    }
  });
}

var currentUser = null;

//----------Function----------//
function getUsername() {
  currentUser = JSON.parse(localStorage.getItem('user'))
}

function logout() {
  localStorage.removeItem('user');
  window.location = "../Page1_Login/login.html";
}

//----------Window load----------//
window.onload = function () {
  getUsername();
  if (currentUser == null) 
  {
    logout();
  }
  else {
    getAllDataOnce();
  }
}