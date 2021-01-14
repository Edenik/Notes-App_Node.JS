
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

const goToEditNote = (noteID) => {
    window.location.href = `http://localhost:3000/editNote/${noteID}`;
}

const setErrorOnPage = (error) => {
    document.getElementById('error').innerHTML = error;
}

