
function getCompliment() {
    const arr = ['kindly','perfect','super','awesome','brilliant','talented','honorable','beautiful',
    'admirable','honest','respectful','amazing','enjoyable','selfless','elegant','gallant', 
    'cheerful', 'polite'];
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function getWish(){
    const arr2 = ['success', 'be happy', 'be beloved', 'never give up', 'well-being', 'health', 'achievements', 'be lucky', 'fortune'];
    let index2 = Math.floor(Math.random() * arr2.length);
    return arr2[index2];
}

function doWhatIWant(){
    let cards = document.getElementsByClassName('card');

    cards[0].childNodes[3].innerHTML = getCompliment();

    cards[1].childNodes[3].innerHTML = getWish();
}

const btn = document.getElementById('btn1');
btn.addEventListener('click', doWhatIWant);
