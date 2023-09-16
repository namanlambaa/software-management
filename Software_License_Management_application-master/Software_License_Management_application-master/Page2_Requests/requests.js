//----------Inserting info in Sub menu----------//
let subMenu = document.getElementById("subMenu");

function toggleMenu() {
    subMenu.classList.toggle("open-menu");
}
let loggedInUser = document.getElementById('loggedInUser');
let logoutLink = document.getElementById('logout-link');
var currentUser = null;

function getUsername() {
    currentUser = JSON.parse(localStorage.getItem('user'))
}

function logout() {
    localStorage.removeItem('user');
    window.location = "../Page1_Login/login.html";
}

//----------Window onLoad function----------//
window.onload = function () {
    getUsername();
    if (currentUser == null) {
        logout();
    }
    else {
        if (currentUser.role !== 0) {
            document.getElementById("approveButton").remove();
        }
        
        loggedInUser.innerText = currentUser.username;
        loggedInUser.href = "#";

        logoutLink.innerText = "Logout";
        logoutLink.href = "javascript:logout()"
    }

}