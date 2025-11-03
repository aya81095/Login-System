// ^ inputs
var loginEmailInput = document.getElementById("loginEmailInput");
var loginPasswordInput = document.getElementById("loginPasswordInput");
var signupNameInput = document.getElementById("signupNameInput");
var signupEmailInput = document.getElementById("signupEmailInput");
var signupPasswordInput = document.getElementById("signupPasswordInput");
var loginButton = document.querySelector(".login");
var signupButton = document.querySelector(".signup");
var logoutButton = document.querySelector(".logout");

// ^ regex
var nameRegex = /^[A-Za-z]{3,}$/;
var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// & sign up
// ^ vars
var users = JSON.parse(localStorage.getItem("users")) || [];

// ^ functions
if (signupButton) {
  signupButton.addEventListener("click", function () {
    signup();
  });
}

function signup() {
  var user = {
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };
  if (emailExist()) {
    document.querySelector(".email-exist").classList.remove("d-none");
    return;
  }
  if (
    nameValidate() &&
    emailValidate() &&
    passwordValidate() &&
    !emailExist()
  ) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    document.querySelector(".success-msg").classList.remove("d-none");
    document.querySelector(".name-error").classList.add("d-none");
    document.querySelector(".email-error").classList.add("d-none");
    document.querySelector(".password-error").classList.add("d-none");
    window.location.href = `${window.location.origin}/login-system/index.html`;
  }
}

function nameValidate() {
  if (nameRegex.test(signupNameInput.value)) {
    document.querySelector(".name-error").classList.add("d-none");
    return true;
  } else {
    document.querySelector(".name-error").classList.remove("d-none");
    return false;
  }
}
function emailValidate() {
  if (emailRegex.test(signupEmailInput.value)) {
    document.querySelector(".email-error").classList.add("d-none");
    return true;
  } else {
    document.querySelector(".email-error").classList.remove("d-none");
    return false;
  }
}
function passwordValidate() {
  if (passwordRegex.test(signupPasswordInput.value)) {
    document.querySelector(".password-error").classList.add("d-none");
    return true;
  } else {
    document.querySelector(".password-error").classList.remove("d-none");
    return false;
  }
}
function emailExist() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === signupEmailInput.value) {
      document.querySelector(".email-exist").classList.remove("d-none");
      return true;
    }
  }
  document.querySelector(".email-exist").classList.add("d-none");
  return false;
}

// & log in
if (loginButton) {
  loginButton.addEventListener("click", function () {
    login();
  });
}

function isLoginEmpty() {
  if (loginEmailInput.value == "" || loginPasswordInput.value == "") {
    document.querySelector(".required").classList.remove("d-none");
    return false;
  } else {
    return true;
  }
}

function login() {
  if (!isLoginEmpty()) {
    return;
  }
  var login = {
    email: loginEmailInput.value,
    password: loginPasswordInput.value,
  };
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email == loginEmailInput.value &&
      users[i].password == loginPasswordInput.value
    ) {
      document.querySelector(".incorrect-message").classList.add("d-none");
      document.querySelector(".required").classList.add("d-none");
      localStorage.setItem("user", JSON.stringify(users[i]));
      loginEmailInput.value = "";
      loginPasswordInput.value = "";
      window.location.href = `${window.location.origin}/login-system/home.html`;
      return;
    }
  }
  document.querySelector(".required").classList.add("d-none");
  document.querySelector(".incorrect-message").classList.remove("d-none");
}

// & home
logoutButton.addEventListener("click", function () {
  logout();
});

var user = JSON.parse(localStorage.getItem("user"));
document.getElementById("userName").innerHTML = user.name;
function logout() {
  localStorage.removeItem("user");
  window.location.href = `${window.location.origin}/login-system/index.html`;
}
