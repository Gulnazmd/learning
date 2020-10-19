// Write a isValidPassword function
// It accepts 2 arguments: password and username
// Password must:
//	- be at least 8 characters
//  - cannot contain spaces
//  - cannot contain the username
// If all requirements are met, return true.
//Otherwise: false

// isValidPassword('89Fjj1nms', 'dogLuvr');  //true
// isValidPassword('dogLuvr123!', 'dogLuvr') //false
// isValidPassword('hello1', 'dogLuvr') //false
//1
function isValidPassword(password, username) {
    if (password.length < 8 || 
        password.indexOf(username) !== -1 || 
        password.indexOf(' ') !== -1) 
    {
        return false;
    }
    return true; 
};
//2
function avg(arr) {
    let sum = 0;
    for(let i of arr){
        sum += i;
    }
    return sum/arr.length;
}

//3
function isPangram(string) {
    let lowerLetters = string.toLowerCase();
    for (let p of 'abcdefghijklmnopqrstuvwxyz') {
        if (lowerLetters.indexOf(p) === -1) {
            return false;
        }
    }
    return true;
}

//4
function getCard() {
    const arr = ['1','2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    let index = Math.floor(Math.random() * arr.length);
    let value  = arr[index];

    const arr2 = ['clubs', 'spades', 'hearts', 'diamonds'];
    let index2 = Math.floor(Math.random() * arr2.length);
    let suit = arr2[index2];

    return {value: value, suit: suit}
}