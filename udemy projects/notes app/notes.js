const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNote(note))
}

addBtn.addEventListener('click', () => addNote())


function addNote(text ='') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="tools">
        <img class="edit" style="width: 20px; height:20px" src="https://static.thenounproject.com/png/1081963-200.png" alt="https://cdn.iconscout.com/icon/premium/png-256-thumb/note-pencile-memo-pen-notebook-book-write-3-14650.png">
        <img class="delete" style="width: 20px; height:20px" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png" alt="http://cdn.onlinewebfonts.com/svg/img_416864.png">
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deletBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deletBtn.addEventListener('click', () => {
        note.remove();

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value)

        updateLS()
    })
    
    document.body.appendChild(note)
}

// save on localStorage

function updateLS(){
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}