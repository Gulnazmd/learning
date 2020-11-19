var count = 0;

// add EventListener for each button

function resetValue() {
  count = 0;
  document.getElementById("number").innerHTML = count;
  number.style.color = "black";
}
function decreaseValue() {
  document.getElementById("number").innerHTML = --count;
  if (count < 0) {
    number.style.color = "red";
  } else if (count == 0) {
    number.style.color = "black";
  }
}
function increseValue() {
  document.getElementById("number").innerHTML = ++count;
  if (count > 0) {
    number.style.color = "green";
  } else if (count == 0) {
    number.style.color = "black";
  }
}
