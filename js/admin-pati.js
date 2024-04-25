$(document).ready(function () {
    // patients table
    var patitable = $('#patiTable').DataTable({
        ajax: {
            url: 'php/get_patients_list.php',
            dataSrc: ''
        },
        columns: [
            { data: 'PatientID' },
            {
                data: null,
                render: function (data, type, row) {
                    const imageName = row.FullName.replace(/ /g, '_');
                    return '<img src="patient/' + imageName + '.jpg" alt="' + row.FullName + '" width="100" height="100">';
                }
            },
            { data: 'FullName' },
            { data: 'Username' },
            { data: 'Email' },
            { data: 'Age' },
            { data: 'Gender' },
            { data: 'Address' },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="edit-button w-full bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" data-id="' + row.PatientID + '">Edit</button><button class="delete-button w-full bg-red-500 text-white px-4 py-2 rounded-lg mr-2 mt-1" data-id="' + row.PatientID + '">Delete</button>';
                }
            }
        ],order: [[0, 'desc']] // Order by the 'id' column descending
    });

    // Edit button click handler
    $('#patiTable').on('click', '.edit-button', function () {
        var PatientID = $(this).data('id');

        // Send an AJAX request to fetch patient details
        $.ajax({
            type: 'POST',
            url: 'php/get-patient-details.php',
            data: { patient_id: PatientID },
            success: function (response) {
                // Parse the response JSON data
                var patientData = JSON.parse(response);

                // Fill the form fields with the retrieved data
                $('#edit_id').val(patientData.patient_id);
                $('#edit_username').val(patientData.username);
                $('#edit_password').val(patientData.password);
                $('#edit_full_name').val(patientData.full_name);
                $('#edit_email').val(patientData.email);
                $('#edit_age').val(patientData.age);
                $('#edit_type').val(patientData.gender);
                $('#edit_address').val(patientData.address);

                // Set the background image of the profile-pic-content div
                var imageUrl = 'patient/' + patientData.full_name.replace(/ /g, '_') + '.jpg?' + new Date().getTime(); // Update the file extension if needed

                $('#profile-pic-content').css({
                    'background-image': 'url(' + imageUrl + ')',
                    'background-size': 'cover',
                    'background-position': 'center'
                });

                // Show the modal
                $('#editPatiModal').removeClass('hidden');
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(xhr.responseText);
            }
        });
    });


    // Delete button click handler
    $('#patiTable').on('click', '.delete-button', function () {
        var PatientID = $(this).data('id');

        // Confirm with the user before deleting
        if (confirm('Are you sure you want to delete this patient?')) {
            // Send an AJAX request to delete the patient record
            $.ajax({
                type: 'POST',
                url: 'php/delete-patient.php',
                data: { patient_id: PatientID },
                success: function (response) {
                    // Handle the success response
                    console.log(response);
                    alert("Patient information deleted succesfully.");
                    location.reload();
                },
                error: function (xhr, status, error) {
                    // Handle errors
                    console.error(xhr.responseText);
                    alert(xhr.responseText);
                    location.reload();
                }
            });
        }
    });

});

// Function to open the modal
function openPatiModal() {
    // Show the modal by adding the 'hidden' class
    document.getElementById('addPatiModal').classList.remove('hidden');
}
// Function to close the modal
function cancelPatiModal() {
    // Hide the modal by adding the 'hidden' class
    document.getElementById('addPatiModal').classList.add('hidden');
    document.getElementById('editPatiModal').classList.add('hidden');
}


// Add event listener to the buttons
document.getElementById('AddPati').addEventListener('click', openPatiModal);

//for saving image in add
document.getElementById('addPatientForm').addEventListener('submit', function (event) {
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
                window.location.href = 'admin-patients.html';
            } else {
                // Display error message if server response indicates failure
                alert('Error: ' + response.message);
                window.location.href = 'admin-patients.html';
            }
        } else {
            // Display error message if AJAX request fails
            alert('Error adding account. Please try again later.');
            window.location.href = 'admin-patients.html';
        }
    };

    // Define AJAX onerror function
    xhr.onerror = function () {
        // Display error message
        alert('Error adding doctor');
        window.location.href = 'admin-doctors.html';
    };

    // Send FormData with AJAX
    xhr.send(formData);
});

//for replacing image in edit
document.getElementById('editPatientForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    var formData = new FormData(this); // Create FormData object with form data
    var fileInput = document.getElementById('edit_image'); // Get file input element

    // Check if file is selected
    if (fileInput.files.length === 0) {
        // Display error message if no file is selected
        alert('Please select an image file.');
    } else {
        // Append the selected file to FormData
        formData.append('edit_image', fileInput.files[0]);

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
                    window.location.href = 'admin-patients.html';
                } else {
                    // Display error message if server response indicates failure
                    alert('Error: ' + response.message);
                    window.location.href = 'admin-patients.html';
                }
            } else {
                // Display error message if AJAX request fails
                alert('Error editing account. Please try again later.');
                window.location.href = 'admin-patients.html';
            }
        };

        // Define AJAX onerror function
        xhr.onerror = function () {
            // Display error message
            alert('Error editing patient information');
            window.location.href = 'admin-patient.html';
        };

        // Send FormData with AJAX
        xhr.send(formData);
    }
});
