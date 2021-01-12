
const url = 'http://localhost:3000/api/notes'
let notes = [];

const getNotes = (query) => {
    fetch(`${url}${query}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(json => {
            notes = [...json];
            setSortBy(query);
            if (notes.length == 0) {
                setNotesOnDOM(null);
                setErrorOnPage('No notes found, start by adding one!')
            } else {
                setNotesOnDOM(json);
                setErrorOnPage(null);
            }
        })
        .catch(err => setErrorOnPage(err))
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
        window.location.href = `http://localhost:3000/?completed=false&sortBy=${value}`;
    } else if (currentUrl.includes('completed=true')) {
        window.location.href = `http://localhost:3000/?completed=true&sortBy=${value}`;
    } else {
        window.location.href = `http://localhost:3000/?sortBy=${value}`;
    }
}

const setNotesOnDOM = (notes) => {
    if (notes) {
        document.getElementById('notes').innerHTML = notes.map(note => {
            let date = new Date(note.createdAt);
            return `
                <div class="card">
                    <div class="card-body ${note.completed ? 'green' : 'red'}">
                        <h5 class="card-title">${note.title}</h5>
                        <h6 class="card-subtitle mb-2">${note.owner}</h6>
                        <p class="card-text ${note.completed ? 'green' : 'red'}"></p>
                        <p class="card-text">${note.body}</p>
                        <p class="card-text">${date.toDateString()} , ${date.toTimeString().substr(0, 5)}</p>
                        <i class="fas fa-trash-alt" onClick="deleteNote('${note._id}')"></i>
                        <i class="fas fa-edit" onClick="goToEditNote('${note._id}')"></i>
                        <i class="fas fa-thumbs-${note.completed ? 'down' : 'up'}" onClick="changeNoteCompleteValue('${note._id}')"></i>
                    </div>
                </div>`
        }
        ).join('')
    } else {
        document.getElementById('notes').innerHTML = '';
    }
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
            setErrorOnPage(null);
        })
        .catch(err => setErrorOnPage(err));

}


const deleteNote = (noteID) => {
    const notesArr = notes.filter(note => note._id != noteID);

    fetch(`${url}/${noteID}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(json => {
            notes = notesArr;
            if (notes.length == 0) {
                setNotesOnDOM(null);
                setErrorOnPage('No notes found, start by adding one!')
            } else {
                setNotesOnDOM(notes);
                setErrorOnPage(null);
            }
        })
        .catch(err => setErrorOnPage(err));
}

const goToEditNote = (noteID) => {
    window.location.href = `http://localhost:3000/editNote/${noteID}`;
}

const setErrorOnPage = (error) => {
    document.getElementById('error').innerHTML = error;
}

