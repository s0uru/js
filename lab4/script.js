// pobieranie
// localStorage.getItem(key)
function getNotes() {
    const notes = localStorage.getItem('notes')
    if (notes) {
        return JSON.parse(notes)
    } else {
        return []
    }
}
// zapisywanie
// localStorage.setItem(key, value)
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}
//tworzenie notatki
function createNote(title, content, color, pinned) {
  const notes = getNotes()
  const newNote = {
    id: Date.now(),
    title,
    content,
    color,
    pinned,
    createdAt: Date.now(),
  };
  notes.push(newNote)
    saveNotes(notes)
    renderNotes()
}
//usuwanie notatki
function deleteNote(id){
    let notes = getNotes()
    notes = notes.filter(note => note.id !== id)
    saveNotes(notes)
    renderNotes()
}
//renderowanie notatki
function renderNotes() {
    const notes = getNotes()
    const notesContainer = document.getElementById('notes-container')
    notesContainer.innerHTML = ''

    notes.sort((a, b) => b.pinned - a.pinned)

    notes.forEach(note => {
        const noteElement = document.createElement('div')
       noteElement.className = 'note'
       noteElement.style.backgroundColor = note.color
         noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button class="delete-button" onclick="deleteNote(${note.id})">usun</button>
          `
          notesContainer.appendChild(noteElement)
    })
}
//obsluga formularza
document.getElementById('note-form').addEventListener('submit', function(event) {  
    event.preventDefault();
    const title = document.getElementById('note-title').value
    const content = document.getElementById('note-content').value
    const color = document.getElementById('note-color').value
    const pinned = document.getElementById('note-pinned').checked

    if(title && content) {
        createNote(title, content, color, pinned)
        this.reset()
    }else{
        alert('tytul i tresc sa wymagane')    
    }
});

document.addEventListener('DOMContentLoaded', renderNotes)
