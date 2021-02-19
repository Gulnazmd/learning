const enterBtn = document.getElementById('enter');
enterBtn.addEventListener('click', () => addNote())

function addNote(){
    const note = document.createElement('div');
    note.classList.add('note')

    note.innerHTML = `
    <div class="warning">
    <h4 id="warningText">You don't know the password.</br>
              It's too privite!!!</h4>
    <button id="warningBtn">Close</button>
    </div>
    `
    const warningBtn = note.querySelector('#warningBtn')

    warningBtn.addEventListener('click', () => {
    note.remove();
    })

document.body.appendChild(note)
}


