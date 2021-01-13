
const url = 'http://localhost:3000/api'

const init = (title) => {
    if (title.toLowerCase() === 'register') {
        createRegisterForm();
    } else if (title.toLowerCase() === 'login') {
        createLoginForm();
    }
}

const emailInput = ` 
    <div class="form-group  mb-4">
    <label for="emailInput">Email</label>
    <input type="email" id="emailInput" class="form-control" placeholder="Email address">
    </div>`;

const passwordInput = `
    <div class="form-group mb-4">
    <label for="passwordInput">Password</label>
    <input type="password" id="passwordInput" class="form-control" placeholder="***********">
    </div>`;

const repeatPasswordInput = `
    <div class="form-group mb-4">
    <label for="repeatPasswordInput">Repeat Password</label>
    <input type="password" id="repeatPasswordInput" class="form-control" placeholder="***********">
    </div>`;

const notifiers = `
    <p id="error"></p>
    <p id="result"></p>`;

const createLoginForm = () => {
    const form = `
        ${emailInput}
        ${passwordInput}
        ${notifiers}
        <button class="btn btn-block login-btn mb-4"> Login </button>
        <p>Don't have an account? <a href="/auth/register" class="text-reset">Register here</a></p>`;

    setFormOnPage(form);
}

const createRegisterForm = () => {
    const form = `
        ${emailInput}
        ${passwordInput}
        ${repeatPasswordInput}
        ${notifiers}
        <p id="generatedPassword"></p>
        <button class="btn btn-block login-btn mb-4"> Register </button>
        <button onclick="generatedPasswordHandler()" class="btn btn-block login-btn mb-4"> Generate Password </button>
        <p>Already have an account? <a href="/auth/login" class="text-reset">Login here</a></p>`;

    setFormOnPage(form);
}

const setFormOnPage = (form) => {
    document.getElementById('authForm').innerHTML = form;
}


const loginHandler = () => {

}


const registerHandler = () => {

}

let generatedPasswordTimeOut;

const generatedPasswordHandler = () => {
    fetch(`${url}/users/generatePassword`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            setGeneratedPassOnPage(json['generatedPassword']);
            setErrorOnPage(null);
        })
        .catch(err => setErrorOnPage(err))
}

const setGeneratedPassOnPage = (password) => {
    const element = document.getElementById('generatedPassword');

    element.innerHTML = `
    <span>Generated password: <strong>${password}</strong></span>
    <p>* Password will disappear after 10 sec.</p>
    `

    clearTimeout(generatedPasswordTimeOut);
    generatedPasswordTimeOut = setTimeout(() => {
        element.innerHTML = ``;
    }, 10000);
}

const setErrorOnPage = (error) => {
    document.getElementById('error').innerHTML = error;
}

const setResultOnPage = (result) => {
    document.getElementById('result').innerHTML = error;
}