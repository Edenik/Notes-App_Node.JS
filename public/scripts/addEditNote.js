const url = 'http://localhost:3000/api/notes'
let noteToEdit;

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
            .catch(err => setErrorOnPage(err))
    }
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


const editNote = () => {
    const noteID = noteToEdit._id;
    const title = document.getElementById('titleInput').value;
    const body = document.getElementById('bodyInput').value;

    if (title.length < 6 || body.length < 6) {
        setErrorOnPage(`<h4>Title and Content must contain at least 6 characters</h4>`);
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
            .catch(err => setErrorOnPage(err));
    }
}

const createNewNote = () => {
    const title = document.getElementById('titleInput').value;
    const body = document.getElementById('bodyInput').value;
    const owner = document.getElementById('ownerInput').value;

    if (title.length < 6 || body.length < 6 || owner.length < 3) {
       setErrorOnPage(`<h4>Title and Content must contain at least 6 characters, Your name must contain at least 3.</h4>`);
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
            .catch(err => setErrorOnPage(err));
    }
   
}

const goBack = () => {
    window.history.back();
}


const goToIndexRoute = () => {
    window.location.href = `http://localhost:3000/allNotes`;
}

const goToCompletedRoute = (bool) => {
    window.location.href = `http://localhost:3000/allNotes?completed=${bool}`;
}

const setErrorOnPage = (error) => {
    document.getElementById('error').innerHTML = error;
}