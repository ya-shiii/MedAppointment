$(document).ready(function () {
    // Change text content with ID 'text-id'
    const textElement = document.getElementById('text-id');
    textElement.textContent = 'Login';

    // Register and login form elements
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Register and login links
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');

    // Event listener for register link
    registerLink.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        textElement.textContent = 'Register';
    });

    // Event listener for login link
    loginLink.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        textElement.textContent = 'Login';
    });

});