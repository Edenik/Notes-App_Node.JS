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
            <label for="email" class="sr-only">Email</label>
            <input type="email" name="email" id="email" class="form-control" placeholder="Email address">
        </div>
        <div class="form-group mb-4">
            <label for="password" class="sr-only">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="***********">
        </div>
        <button class="btn btn-block login-btn mb-4"> Login </button>
        <p>Don't have an account? <a href="/auth/register" class="text-reset">Register here</a></p>
        </div>
`;

    setFormOnPage(form);
}

const createRegisterForm = () => {
    const form = `
        <div class="form-group  mb-4">
            <label for="email" class="sr-only">Email</label>
            <input type="email" name="email" id="email" class="form-control" placeholder="Email address">
        </div>
        <div class="form-group mb-4">
            <label for="password" class="sr-only">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="***********">
        </div>

        <div class="form-group mb-4">
            <label for="password" class="sr-only">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="***********">
        </div>
        <button class="btn btn-block login-btn mb-4"> Register </button>
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


const setErrorOnPage = (error) => {
    document.getElementById('error').innerHTML = error;
}

const setResultOnPage = (result) => {
    document.getElementById('result').innerHTML = error;
}