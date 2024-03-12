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

//for saving image in add
document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    var formData = new FormData(this); // Create FormData object with form data
    var fileInput = document.getElementById('add_image'); // Get file input element

    // Check if file is selected
    if (fileInput.files.length === 0) {
        // Display error message if no file is selected
        alert('Please select an image file.');
        return;
    }

    // Append the selected file to FormData
    formData.append('add_image', fileInput.files[0]);

    // Send AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.action, true);

    // Define AJAX onload function
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText); // Parse the JSON response
            if (response.success) {
                // Display success message if server response indicates success
                alert(response.message);
                // Redirect to the desired page
                window.location.href = 'index.html';
            } else {
                // Display error message if server response indicates failure
                alert('Error: ' + response.message);
                window.location.href = 'index.html';
            }
        } else {
            // Display error message if AJAX request fails
            alert('Error adding account. Please try again later.');
            window.location.href = 'index.html';
        }
    };

    // Define AJAX onerror function
    xhr.onerror = function () {
        // Display error message if AJAX request encounters an error
        alert('Error adding account. Please try again later.');
        window.location.href = 'index.html';
    };

    // Send FormData with AJAX
    xhr.send(formData);
});
