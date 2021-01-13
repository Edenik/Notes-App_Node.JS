
const url = 'http://localhost:3000/api'

const init = (title) => {
    if (title.toLowerCase() === 'register') {
        createRegisterForm();
    } else if (title.toLowerCase() === 'login') {
        createLoginForm();
    }
}

const createLoginForm = () => {
    const form = `
        <div class="form-group  mb-4">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" placeholder="Email address">
        </div>
        <div class="form-group mb-4">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="***********">
        </div>
        <p id="error"></p>
        <p id="result"></p>
        <button class="btn btn-block login-btn mb-4"> Login </button>
        <p>Don't have an account? <a href="/auth/register" class="text-reset">Register here</a></p>
        </div>
`;

    setFormOnPage(form);
}

const createRegisterForm = () => {
    const form = `
        <div class="form-group  mb-4">
            <label for="emailInput">Email</label>
            <input type="email" id="emailInput" class="form-control" placeholder="Email address">
        </div>
        <div class="form-group mb-4">
            <label for="passwordInput">Password</label>
            <input id="passwordInput" type="password" id="password" class="form-control" placeholder="***********">
        </div>

        <div class="form-group mb-4">
            <label for="repeatPasswordInput">Repeat Password</label>
            <input type="password" id="repeatPasswordInput" class="form-control" placeholder="***********">
        </div>
        <p id="generatedPassword"></p>
        <p id="error"></p>
        <p id="result"></p>
        <button class="btn btn-block login-btn mb-4"> Register </button>
        <button onclick="generatedPasswordHandler()"  class="btn btn-block login-btn mb-4"> Generate Password </button>
        <p>Already have an account? <a href="/auth/login" class="text-reset">Login here</a></p>
        </div>

`;

    setFormOnPage(form);

}

const setFormOnPage = (form) => {
    document.getElementById('authForm').innerHTML = form;
}


const loginHandler = () => {

}


const registerHandler = () => {

}

const generatedPasswordHandler = () => {
    fetch(`${url}/users/generatePassword`, {method:"GET"})
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

    setTimeout(() => {
        element.innerHTML = ``;
    }, 10000);
}

const setErrorOnPage = (error) => {
    document.getElementById('error').innerHTML = error;
}

const setResultOnPage = (result) => {
    document.getElementById('result').innerHTML = error;
}