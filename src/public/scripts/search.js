const url = 'http://localhost:3000/api/notes'
let notes = [];

const searchHandler = () => {
    const propery = document.getElementById('propertyInput').value;
    const text = document.getElementById('textInput').value;
    if (text.trim() == '') {
        setErrorOnPage('<h4>Please enter at least 1 character to search.</h4>');
    } else {
        const query = `?${propery}=${text}`
        search(query);
    }
}

const search = (query) => {
    if (query.trim() != '') {
        fetch(`${url}${query}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                notes = [...json];
                if (json.length == 0) {
                    setNotesOnDOM(null);
                    setErrorOnPage('No notes found!')
                } else {
                    setNotesOnDOM(json);
                    setErrorOnPage(null);
                }
            })
            .catch(err => setErrorOnPage(err))
    }
}


const setNotesOnDOM = async (notes) => {
    const mutualScripts = await import('./mutual_scripts.js');
    mutualScripts.setNotesOnDOM(notes);
}

const changeNoteCompleteValue = async (noteID) => {
    const mutualScripts = await import('./mutual_scripts.js');
    mutualScripts.changeNoteCompleteValue(noteID);
}


const deleteNote = async (noteID) => {
    const mutualScripts = await import('./mutual_scripts.js');
    mutualScripts.deleteNote(noteID);
}

const setErrorOnPage = (error) => {
    document.getElementById('error').innerHTML = error;
}

const goToEditNote = (noteID) => {
    window.location.href = `http://localhost:3000/editNote/${noteID}`;
}
