function validateEmail(email) 
{
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateForm() {
    var x = document.forms["login_form"]["email"].value;
    if (!validateEmail(x)) {
      alert("email is incorrect");
      return false;
    }
    var z = document.forms["login_form"]["password1"].value;
    if (!validPassword(z)) {
      alert("incorrect password");
      return false;
    }
}
function validPassword(password) {
  if (password.length < 8) {
    return false;
  }
  const re = /\w{8,}$/;
  return re.test(password);
}
const colors = [
  "rgb(250, 247, 244)", 
  "rgba(233, 241, 233, 0.658)", 
  "rgba(128, 241, 128, 0.658)", 
  "rgba(238, 241, 50, 0.658)",
  "rgba(221, 130, 65, 0.658)",
  "rgba(44, 206, 228, 0.658)",
  "rgba(170, 63, 170, 0.658)",
  "rgba(218, 72, 96, 0.658)"
];
window.onload = function() {
const btn = document.getElementById("btn2");
const color = document.querySelector(".color");
btn.addEventListener("click", function() {
    const randomNumber = getRandomNumber();
    const container = document.querySelector("#logIn");
    container.style.backgroundColor = colors[randomNumber];
});
function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
}
