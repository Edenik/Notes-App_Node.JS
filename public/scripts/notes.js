const url = 'http://localhost:3000/api/notes'
let notes = [];
let noteToEdit;


const getNotes = (query) => {
    fetch(`${url}${query}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(json => {
            notes = json;
            setNotesOnDOM(json);
            setSortBy(query);
        })
        .catch(err => console.log(err))
}

const setSortBy = (query) => {
    let sortOptions = [
        { value: 'title:desc', text: 'Title ↑' },
        { value: 'title:asc', text: 'Title ↓' },
        { value: 'completed:desc', text: 'Completed ↑' },
        { value: 'completed:asc', text: 'Completed ↓' },
        { value: 'owner:desc', text: 'Owner ↑' },
        { value: 'owner:asc', text: 'Owner ↓' },
        { value: 'body:desc', text: 'Body ↑' },
        { value: 'body:asc', text: 'Body ↓' },
        { value: 'createdAt:desc', text: 'CreatedAt ↑' },
        { value: 'createdAt:asc', text: 'CreatedAt ↓' },
    ].map((option) =>
        ` <option value="${option.value}" ${query.includes(`sortBy=${option.value}`) ? 'Selected' : null}>
        ${option.text}
        </option>
        `).join('');


    document.getElementById('sortBy').innerHTML = `
    <label for="sortBySelector">Sort By:</label>

    <select name="sortBySelector" id="sortBySelector" onchange="changeSort(value)">
      <option value="none" ${!query.includes('sortBy') ? 'Selected' : null}>None</option>
   ${sortOptions}
    </select>
    `
}

const changeSort = (value) => {
    const currentUrl = `${window.location}`;
    if (currentUrl.includes('completed=false')) {
        window.location.href = `http://localhost:3000/allNotes?completed=false&sortBy=${value}`;
    } else if (currentUrl.includes('completed=true')) {
        window.location.href = `http://localhost:3000/allNotes?completed=true&sortBy=${value}`;
    } else {
        window.location.href = `http://localhost:3000/allNotes?sortBy=${value}`;
    }
}

const getNoteByID = (noteID) => {
    if (noteID) {
        fetch(`${url}/${noteID}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                noteToEdit = {...json};
                setNoteToEdit(json);
            })
            .catch(err => console.log(err))
    }
}

const setNotesOnDOM = (notes) => {
    document.getElementById('notes').innerHTML = notes.map(note =>
  {
      let date = new Date(note.createdAt);
      return       `
      <div class="card">
          <div class="card-body ${note.completed ? 'green' : 'red'}">
              <h5 class="card-title">${note.title}</h5>
              <h6 class="card-subtitle mb-2">${note.owner}</h6>
              <p class="card-text ${note.completed ? 'green' : 'red'}"></p>
              <p class="card-text">${note.body}</p>
              <p class="card-text">${date.toDateString()} , ${date.toTimeString().substr(0,5)}</p>
              <i class="fas fa-trash-alt" onClick="deleteNote('${note._id}')"></i>
              <i class="fas fa-edit" onClick="goToEditNote('${note._id}')"></i>
              <i class="fas fa-thumbs-${note.completed ? 'down' : 'up'}" onClick="changeNoteCompleteValue('${note._id}')"></i>
          </div>
      </div>`
  }
    ).join('')
}

const setNoteToEdit = (note) => {
    document.getElementById('titleInput').value = note.title;
    document.getElementById('bodyInput').value = note.body;
    document.getElementById('ownerInput').value = note.owner;
    document.getElementById('ownerInput').disabled = true;
    document.getElementById('saveEditButton').innerHTML = `
<button type="button" class="btn btn-primary" onclick="editNote()">Save Changes</button>
`
}

const changeNoteCompleteValue = (noteID) => {
    const noteIndex = notes.findIndex(note => note._id == noteID);
    const note = { ...notes[noteIndex] };
    note.completed = !note.completed;
    fetch(`${url}/${noteID}`, {
        method: "PATCH",
        body: JSON.stringify({
            completed: note.completed
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(json => {
            notes[noteIndex] = note;
            setNotesOnDOM(notes);
        })
        .catch(err => console.log(err));

}

const editNote = () => {
    const noteID = noteToEdit._id;
    const title = document.getElementById('titleInput').value;
    const body = document.getElementById('bodyInput').value;

    if (title.length < 6 || body.length < 6) {
        document.getElementById('error').innerHTML = `<h4>Title and Content must contain at least 6 characters</h4>`
    } else {
        fetch(`${url}/${noteID}`, {
            method: "PATCH",
            body: JSON.stringify({
                title,
                body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(json => {
                const currentUrl = `${window.location}`;
                if (currentUrl.includes('completed=false')) {
                    goToCompletedRoute(false);
                } else if (currentUrl.includes('completed=true')) {
                    goToCompletedRoute(true);
                } else {
                    goToIndexRoute();
                }
            })
            .catch(err => console.log(err));
    }
}

const createNewNote = () => {
    const title = document.getElementById('titleInput').value;
    const body = document.getElementById('bodyInput').value;
    const owner = document.getElementById('ownerInput').value;

    if (title.length < 6 || body.length < 6 || owner.length < 3) {
        document.getElementById('error').innerHTML = `<h4>Title and Content must contain at least 6 characters, Your name must contain at least 3.</h4>`
    } else {
        fetch(`${url}`, {
            method: "POST",
            body: JSON.stringify({
                title,
                body,
                owner
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(json => {
                goToIndexRoute();
            })
            .catch(err => console.log(err));
    }
   
}

const deleteNote = (noteID) => {
    const noteIndex = notes.findIndex(note => note._id == noteID);
    const notesArr = notes.splice(noteIndex, 1);

    fetch(`${url}/${noteID}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(json => {
            notes = notesArr;
            setNotesOnDOM(notes);
        })
        .catch(err => console.log(err));
}


const goToIndexRoute = () => {
    window.location.href = `http://localhost:3000/allNotes`;
}

const goBack = () => {
    window.history.back();
}

const goToCompletedRoute = (bool) => {
    window.location.href = `http://localhost:3000/allNotes?completed=${bool}`;
}

const goToEditNote = (noteID) => {
    window.location.href = `http://localhost:3000/editNote/${noteID}`;
}