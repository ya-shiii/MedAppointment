$(document).ready(function () {
    // AJAX request to retrieve session full name
    $.ajax({
        url: 'php/get_fullname.php',
        method: 'GET',
        dataType: 'json', // Parse the response as JSON
        success: function (response) {
            // Log the entire response object to verify its structure
            console.log(response);

            // Check if the full name is present in the response
            if ('fullname' in response) {
                // Extract the full name from the response
                var fullname = response.fullname;

                // Update the content of the 'patient-name' span element with the session full name
                $('#patient-name').text(fullname);
            } else {
                console.error('Full name is not present in the response.');
            }
        },
        error: function () {
            console.error('Error occurred while retrieving session full name');
        }
    });



    // appointments table
    var appotable = $('#appoTable').DataTable({
        ajax: {
            url: 'php/get_user-appointment.php',
            dataSrc: ''
        },
        columns: [
            { data: 'appointment_id' },
            { data: 'doctor_name' },
            { data: 'doctor_type' },
            { data: 'clinic_address' },
            { data: 'appointment_date', type: 'date' }, // Date type for appointment_date
            { data: 'time' },
            { data: 'status' },
            {
                data: null,
                render: function (data, type, row) {
                    const confbtn = '<button class="confirm-button w-2/3 mt-2 bg-green-600 text-white px-2 text-center py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Confirm</button>'
                    const reschedbtn = '<button class="update-button w-2/3 mt-2 bg-blue-600 text-white px-2 text-center py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Reschedule</button>'
                    const cancelbtn = '<button class="cancel-button w-2/3 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Cancel</button>'

                    if ((row.status === 'pending')&&(row.pat_app === 'pending')) {
                        // Return a button for cancel action
                        return confbtn + reschedbtn + cancelbtn;
                    } else if ((row.status === 'pending')&&(row.pat_app === 'yes')) {
                        // Return a button for cancel action
                        return reschedbtn + cancelbtn;
                    } else {
                        // Return empty string if status is not 'pending'
                        return '';
                    }
                }
            }
        ],
        columnDefs: [
            {
                targets: 4, // Index of the 'appointment_date' column
                render: function (data, type, row) {
                    var appointmentDate = new Date(data);
                    var today = new Date();
                    var options = {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        weekday: 'long'
                    };
                    if (appointmentDate.toDateString() === today.toDateString()) {
                        return 'Today';
                    } else {
                        return appointmentDate.toLocaleDateString('en-US', options);
                    }
                }
            }
        ],
        order: [[4, 'desc']] // Order by the 'appointment_date' column ascending
    });

    // Update button click handler
    $('#appoTable').on('click', '.update-button', function () {
        var appointment_id = $(this).data('id');

        // Populate the modal with appointment details via AJAX
        $.ajax({
            url: 'php/get_appointment_details.php',
            method: 'POST',
            data: { appointment_id: appointment_id },
            success: function (response) {
                // Parse the response JSON
                var appointment = JSON.parse(response);
                // console.log(response);
                // Populate the modal fields with appointment details
                $('#edit_id').val(appointment.appointment_id);
                $('#edit_doctor_name').val(appointment.doctor_name);
                $('#edit_doctor_type').val(appointment.doctor_type);
                $('#edit_clinic_address').val(appointment.clinic_address);
                $('#edit_app_date').val(appointment.appointment_date);
                $('#edit_app_time').val(appointment.time);
                // Show the modal
                $('#updateModal').removeClass('hidden');

                const editProfilePicOutput = document.getElementById('edit-profile-pic-content');
                var imageUrl = 'img/' + appointment.doctor_name.replace(/ /g, '_') + '.jpg'; // Update the file extension if needed
                editProfilePicOutput.classList.remove('hidden');
                $(editProfilePicOutput).css({
                    'background-image': 'url(' + imageUrl + ')',
                    'background-size': 'cover',
                    'background-position': 'center'
                });
                // Get the value of the edit_doctor_type input field
                var doctorType = appointment.doctor_type;

                // Make an AJAX request to fetch data based on the doctor type
                $.ajax({
                    url: 'php/fetch_doctor_type_description.php',
                    method: 'POST',
                    data: { doctor_type: doctorType },
                    dataType: 'json',
                    success: function (response) {
                        // Update the spec-description paragraph with the fetched data
                        $('#spec-description').text(response.description);
                    },
                    error: function (xhr, status, error) {
                        // Handle errors
                        console.error('Error fetching doctor type description:', error);
                    }
                });



            },
            error: function (xhr, status, error) {
                console.error('Error fetching appointment details:', error);
                // Optionally, display an error message to the user
            }
        });
    });


    // Confirm button click handler
    $('#appoTable').on('click', '.confirm-button', function () {
        var appointment_id = $(this).data('id');

        // Ask the user for confirmation
        var confirmConfirm = confirm('Are you sure you want to confirm this appointment?');
        if (!confirmConfirm) {
            // If the user cancels the action, return
            return;
        }

        // Send AJAX request to update the status to "cancelled"
        $.ajax({
            url: 'php/update_appointment_status.php',
            method: 'POST',
            data: {
                appointment_id: appointment_id,
                status: 'yes'
            },
            success: function (response) {
                // If the update is successful, reload the DataTable
                console.log('Appointment ' + appointment_id + ' has been confirmed.');
                alert('Appointment has been confirmed.');
                location.reload();
            },
            error: function (xhr, status, error) {
                // If there's an error, log it to the console
                console.error('Error confirming appointment:', error);
                alert('Error confirming appointment:', error);
                location.reload();
            }
        });
    });

    // Cancel button click handler
    $('#appoTable').on('click', '.cancel-button', function () {
        var appointment_id = $(this).data('id');

        // Ask the user for confirmation
        var confirmCancel = confirm('Are you sure you want to cancel this appointment?');
        if (!confirmCancel) {
            // If the user cancels the action, return
            return;
        }

        // Send AJAX request to update the status to "cancelled"
        $.ajax({
            url: 'php/update_appointment_status.php',
            method: 'POST',
            data: {
                appointment_id: appointment_id,
                status: 'cancelled'
            },
            success: function (response) {
                // If the update is successful, reload the DataTable
                console.log('Appointment ' + appointment_id + ' has been cancelled.');
                alert('Appointment ' + ' has been cancelled.');
                location.reload();
            },
            error: function (xhr, status, error) {
                // If there's an error, log it to the console
                console.error('Error cancelling appointment:', error);
                alert('Error cancelling appointment:', error);
                location.reload();
            }
        });
    });

    // Fetch data for dropdown
    $.ajax({
        url: 'php/get_doctortypes.php',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            // Populate the dropdown with fetched data
            response.forEach(function (item) {
                $('#add_doctor_type').append(`<option value="${item.TypeName}">${item.TypeName}</option>`);
            });

        },
        error: function () {
            console.error('Error occurred while fetching doctortypes');
        }
    });

});

// Add event listener to the buttons
document.getElementById('openAddModal').addEventListener('click', openAddModal);

// Function to open the modal
function openAddModal() {
    // Show the modal by adding the 'hidden' class
    document.getElementById('addModal').classList.remove('hidden');
}

// Function to close the modal
function cancelModal() {
    // Hide the modal by adding the 'hidden' class
    document.getElementById('updateModal').classList.add('hidden');
    document.getElementById('addModal').classList.add('hidden');
    document.getElementById('time-message').textContent = 'Please select time. Only 2 slots per hour.';
    document.getElementById('time-message').style.color = '';
    document.getElementById('date-message').textContent = 'Please select a date.';
    document.getElementById('date-message').style.color = '';
}

// Edit appointment weekend and time logic
document.addEventListener('DOMContentLoaded', function () {
    // Get the date input element
    const editappDateInput = document.getElementById('edit_app_date');
    // Get the time select element
    const editappTimeSelect = document.getElementById('edit_app_time');
    // Get the time message element
    const edittimeMessage = document.getElementById('edit_time-message');
    // Get the submit button
    const editsubmitButton = document.querySelector('button[type="submit"]');
    // Get the date message element
    const editdateMessage = document.getElementById('edit_date-message');

    // Add event listener for date input change
    editappDateInput.addEventListener('change', function () {
        // Get the selected date value
        const editselectedDate = new Date(this.value);
        // Get the current date
        const editcurrentDate = new Date();
        // Set the current date to the start of the day
        editcurrentDate.setHours(0, 0, 0, 0);

        // Check if the selected date is tomorrow or later and not a weekend
        if (editselectedDate > editcurrentDate && ![0, 6].includes(editselectedDate.getDay())) {
            // Enable the submit button
            editsubmitButton.disabled = false;
            // Change the date message
            editdateMessage.textContent = 'Please select a date.';
            // Reset the text color
            editdateMessage.style.color = ''; // Reset to default

            // Get the selected time value
            const editselectedTime = editappTimeSelect.value;

            // Check if time is selected
            if (editselectedTime) {
                // Send AJAX request to check for existing appointments
                $.ajax({
                    url: 'php/check_existing_appointments.php',
                    method: 'POST',
                    data: {
                        appointment_date: this.value,
                        appointment_time: editselectedTime
                    },
                    success: function (response) {
                        // Parse the response as JSON
                        const result = JSON.parse(response);
                        // Check if there are already 2 appointments at the selected time
                        if (result.length >= 2) {
                            // Disable the submit button
                            editsubmitButton.disabled = true;
                            // Change the time message
                            edittimeMessage.textContent = 'Two appointments already scheduled for this time. Please select another time.';
                            // Change the text color to red
                            edittimeMessage.style.color = 'red';
                        } else {
                            // Enable the submit button
                            editsubmitButton.disabled = false;
                            // Reset the time message
                            edittimeMessage.textContent = 'Please select time. Only 2 slots per hour.';
                            // Reset the text color
                            edittimeMessage.style.color = ''; // Reset to default
                        }
                    },
                    error: function (xhr, status, error) {
                        // If there's an error, log it to the console
                        console.error('Error checking existing appointments:', error);
                        // Show a generic error message
                        edittimeMessage.textContent = 'Error checking existing appointments. Please try again.';
                        // Change the text color to red
                        edittimeMessage.style.color = 'red';
                    }
                });
            }
        } else {
            // Disable the submit button
            editsubmitButton.disabled = true;
            // Change the date message
            editdateMessage.textContent = 'Selected date must be tomorrow or later, and weekdays only.';
            // Change the text color to red
            editdateMessage.style.color = 'red';
            // Reset the time message
            edittimeMessage.textContent = 'Please select time. Only 2 slots per hour.';
            // Reset the text color
            edittimeMessage.style.color = ''; // Reset to default
        }
    });


    // Add event listener for time select change
    editappTimeSelect.addEventListener('change', function () {
        // Get the selected time value
        const editselectedTime = this.value;
        // Get the selected date value
        const editselectedDate = document.getElementById('edit_app_date').value;

        // Check if both time and date are selected
        if (editselectedTime && editselectedDate) {
            // Send AJAX request to check for existing appointments
            $.ajax({
                url: 'php/check_existing_appointments.php',
                method: 'POST',
                data: {
                    appointment_date: editselectedDate,
                    appointment_time: editselectedTime
                },
                success: function (response) {
                    // Parse the response as JSON
                    const result = JSON.parse(response);
                    // Check if there are already 2 appointments at the selected time
                    if (result.length >= 2) {
                        // Disable the submit button
                        editsubmitButton.disabled = true;
                        // Change the time message
                        edittimeMessage.textContent = 'Two appointments already scheduled for this time. Please select another time.';
                        // Change the text color to red
                        edittimeMessage.style.color = 'red';
                    } else {
                        // Enable the submit button
                        editsubmitButton.disabled = false;
                        // Reset the time message
                        edittimeMessage.textContent = 'Please select time. Only 2 slots per hour.';
                        // Reset the text color
                        edittimeMessage.style.color = ''; // Reset to default
                    }
                },
                error: function (xhr, status, error) {
                    // If there's an error, log it to the console
                    console.error('Error checking existing appointments:', error);
                    // Show a generic error message
                    edittimeMessage.textContent = 'Error checking existing appointments. Please try again.';
                    // Change the text color to red
                    edittimeMessage.style.color = 'red';
                }
            });
        }

    });

});

// show doctor type description via selecting doctor type logic
document.addEventListener('DOMContentLoaded', function () {
    // Get the select element for doctor type
    const doctorTypeSelect = document.getElementById('add_doctor_type');
    // Get the description element
    const descriptionElement = document.getElementById('add_spec-description');

    // Add event listener for doctor type select change
    doctorTypeSelect.addEventListener('change', function () {
        // Get the selected doctor type value
        const selectedDoctorType = this.value;

        // Send AJAX request to fetch the description based on the selected doctor type
        $.ajax({
            url: 'php/fetch_doctor_type_description.php',
            method: 'POST',
            data: { doctor_type: selectedDoctorType },
            success: function (response) {
                // Parse the JSON response
                const data = JSON.parse(response);
                // Extract the text from the response
                const descriptionText = data.description;
                // Update the description element with the extracted text
                descriptionElement.textContent = descriptionText;
            },
            error: function (xhr, status, error) {
                // If there's an error, log it to the console
                console.error('Error fetching description:', error);
                // Show a generic error message
                descriptionElement.textContent = 'Error fetching description. Please try again.';
            }
        });
    });
});

// list doctor names based on selected doctor type logic
document.addEventListener('DOMContentLoaded', function () {
    // Get the select element for doctor type
    const doctorTypeSelect = document.getElementById('add_doctor_type');
    // Get the select element for doctor name
    const doctorNameSelect = document.getElementById('add_doctor_id');

    // Add event listener for doctor type select change
    doctorTypeSelect.addEventListener('change', function () {
        // Get the selected doctor type value
        const selectedDoctorType = this.value;

        // Clear existing options in doctor name select
        doctorNameSelect.innerHTML = '<option value="">Select Doctor</option>';

        // Send AJAX request to fetch doctors based on the selected doctor type
        $.ajax({
            url: 'php/fetch_doctors_by_type.php',
            method: 'POST',
            data: { doctor_type: selectedDoctorType },
            success: function (response) {
                // Parse the JSON response
                const doctors = JSON.parse(response);
                // Populate doctor name select with fetched doctors
                doctors.forEach(function (doctor) {
                    const option = document.createElement('option');
                    option.value = doctor.DoctorID;
                    option.textContent = doctor.FullName;
                    doctorNameSelect.appendChild(option);
                });
            },
            error: function (xhr, status, error) {
                // If there's an error, log it to the console
                console.error('Error fetching doctors:', error);
                // Show a generic error message
                doctorNameSelect.innerHTML = '<option value="">Error fetching doctors. Please try again.</option>';
            }
        });
    });
});

// show address of selected doctor name
document.addEventListener('DOMContentLoaded', function () {
    // Get the select element for doctor name
    const doctorIDSelect = document.getElementById('add_doctor_id');
    // Get the doctor name input element
    const adddoctorNameSelect = document.getElementById('add_doctor_name');
    // Get the clinic address input element
    const addclinicAddressInput = document.getElementById('add_clinic_address');

    const profilePicOutput = document.getElementById('profile-pic-content');


    // Add event listener for doctor name select change
    doctorIDSelect.addEventListener('change', function () {
        // Get the selected doctor ID
        const selectedDoctorId = this.value;
        //console.log(selectedDoctorId);

        // Send AJAX request to fetch the clinic address based on the selected doctor
        $.ajax({
            url: 'php/fetch_doctor-info.php',
            method: 'POST',
            data: { doctor_id: selectedDoctorId },
            success: function (response) {
                // Parse the JSON response
                const data = JSON.parse(response);

                // Check if the response contains error
                if (data.error) {
                    // Display the error message
                    addclinicAddressInput.value = data.error;
                } else {
                    // Update the doctor name and clinic address inputs with the fetched values
                    adddoctorNameSelect.value = data.FullName;
                    addclinicAddressInput.value = data.ClinicAddress;

                    var imageUrl = 'img/' + data.FullName.replace(/ /g, '_') + '.jpg'; // Update the file extension if needed
                    profilePicOutput.classList.remove('hidden');
                    $(profilePicOutput).css({
                        'background-image': 'url(' + imageUrl + ')',
                        'background-size': 'cover',
                        'background-position': 'center'
                    });
                }
            },
            error: function (xhr, status, error) {
                // If there's an error, log it to the console
                console.error('Error fetching clinic address:', error);
                // Show a generic error message
                clinicAddressInput.value = 'Error fetching clinic address. Please try again.';
            }
        });
    });
});

// weekend and time logic for add appointment logic
document.addEventListener('DOMContentLoaded', function () {
    // Get the date input element
    const appAddDateInput = document.getElementById('add_app_date');
    // Get the time select element
    const appAddTimeSelect = document.getElementById('add_app_time');
    // Get the time message element
    const addtimeMessage = document.getElementById('add_time-message');
    // Get the submit button
    const submitButton = document.querySelector('button[type="submit"]');
    // Get the date message element
    const addDateMessage = document.getElementById('add_date-message');

    // Add event listener for date input change
    appAddDateInput.addEventListener('change', function () {
        // Get the selected date value
        const selectedDate = new Date(this.value);
        // Get the current date
        const currentDate = new Date();
        // Set the current date to the start of the day
        currentDate.setHours(0, 0, 0, 0);

        // Check if the selected date is tomorrow or later and not a weekend
        if (selectedDate > currentDate && ![0, 6].includes(selectedDate.getDay())) {
            // Enable the submit button
            submitButton.disabled = false;
            // Change the date message
            addDateMessage.textContent = 'Please select a date.';
            // Reset the text color
            addDateMessage.style.color = ''; // Reset to default

            // Get the selected time value
            const selectedTime = appAddTimeSelect.value;

            // Check if time is selected
            if (selectedTime) {
                // Send AJAX request to check for existing appointments
                $.ajax({
                    url: 'php/check_existing_appointments.php',
                    method: 'POST',
                    data: {
                        appointment_date: this.value,
                        appointment_time: selectedTime
                    },
                    success: function (response) {
                        // Parse the response as JSON
                        const result = JSON.parse(response);
                        // Check if there are already 2 appointments at the selected time
                        if (result.length >= 2) {
                            // Disable the submit button
                            submitButton.disabled = true;
                            // Change the time message
                            addtimeMessage.textContent = 'Two appointments already scheduled for this time. Please select another time.';
                            // Change the text color to red
                            addtimeMessage.style.color = 'red';
                        } else {
                            // Enable the submit button
                            submitButton.disabled = false;
                            // Reset the time message
                            addtimeMessage.textContent = 'Please select time. Only 2 slots per hour.';
                            // Reset the text color
                            addtimeMessage.style.color = ''; // Reset to default
                        }
                    },
                    error: function (xhr, status, error) {
                        // If there's an error, log it to the console
                        console.error('Error checking existing appointments:', error);
                        // Show a generic error message
                        addtimeMessage.textContent = 'Error checking existing appointments. Please try again.';
                        // Change the text color to red
                        addtimeMessage.style.color = 'red';
                    }
                });
            }
        } else {
            // Disable the submit button
            submitButton.disabled = true;
            // Change the date message
            addDateMessage.textContent = 'Selected date must be tomorrow or later, and weekdays only.';
            // Change the text color to red
            addDateMessage.style.color = 'red';
            // Reset the time message
            addtimeMessage.textContent = 'Please select time. Only 2 slots per hour.';
            // Reset the text color
            addtimeMessage.style.color = ''; // Reset to default
        }
    });


    // Add event listener for time select change
    appAddTimeSelect.addEventListener('change', function () {
        // Get the selected time value
        const addselectedTime = this.value;
        // Get the selected date value
        const addselectedDate = document.getElementById('edit_app_date').value;

        // Check if both time and date are selected
        if (addselectedTime && addselectedDate) {
            // Send AJAX request to check for existing appointments
            $.ajax({
                url: 'php/check_existing_appointments.php',
                method: 'POST',
                data: {
                    appointment_date: addselectedDate,
                    appointment_time: addselectedTime
                },
                success: function (response) {
                    // Parse the response as JSON
                    const result = JSON.parse(response);
                    console.log('Existing Appointments' + response);
                    // Check if there are already 2 appointments at the selected time
                    if (result.length >= 2) {
                        // Disable the submit button
                        submitButton.disabled = true;
                        // Change the time message
                        addtimeMessage.textContent = 'Two appointments already scheduled for this time. Please select another time.';
                        // Change the text color to red
                        addtimeMessage.style.color = 'red';
                    } else {
                        // Enable the submit button
                        submitButton.disabled = false;
                        // Reset the time message
                        addtimeMessage.textContent = 'Please select time. Only 2 slots per hour.';
                        // Reset the text color
                        addtimeMessage.style.color = ''; // Reset to default
                    }
                },
                error: function (xhr, status, error) {
                    // If there's an error, log it to the console
                    console.error('Error checking existing appointments:', error);
                    // Show a generic error message
                    addtimeMessage.textContent = 'Error checking existing appointments. Please try again.';
                    // Change the text color to red
                    addtimeMessage.style.color = 'red';
                }
            });
        }

    });

});



// For editing account info
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("openEditModal").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Fetch data using AJAX
        var formData = new FormData();
        formData.append('edit_id', document.getElementById("edit_id").value);
        formData.append('edit_username', document.getElementById("edit_username").value);
        formData.append('edit_password', document.getElementById("edit_password").value);
        formData.append('edit_full_name', document.getElementById("edit_full_name").value);
        formData.append('edit_email', document.getElementById("edit_email").value);
        formData.append('edit_age', document.getElementById("edit_age").value);
        formData.append('edit_type', document.getElementById("edit_type").value);
        formData.append('edit_address', document.getElementById("edit_address").value);



        fetch('php/fetch-acc-details.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Fill the modal with fetched data
            document.getElementById("edit_id").value = data.id;
            document.getElementById("edit_username").value = data.username;
            document.getElementById("edit_password").value = data.password;
            document.getElementById("edit_full_name").value = data.full_name;
            document.getElementById("edit_email").value = data.email;
            document.getElementById("edit_age").value = data.age;
            document.getElementById("edit_type").value = data.type;
            document.getElementById("edit_address").value = data.address;

            // Set the background image of the profile-pic-content div
            var imageUrl = 'patient/' + data.full_name.replace(/ /g, '_') + '.jpg?' + new Date().getTime(); // Update the file extension if needed

            $('#acc-pic-content').css({
                'background-image': 'url(' + imageUrl + ')',
                'background-size': 'cover',
                'background-position': 'center'
            });

            // Show the modal
            document.getElementById("editAccModal").classList.remove("hidden");
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });
});

function cancelAccModal() {
    // Hide the modal
    document.getElementById("editAccModal").classList.add("hidden");
}

//for replacing image in edit
document.getElementById('editAccForm').addEventListener('submit', function (event) {
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
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText); // Parse the JSON response
                if (response.success) {
                    // Display success message if server response indicates success
                    alert(response.message);
                    // Redirect to the desired page
                    window.location.href = 'dashboard.html';
                } else {
                    // Display error message if server response indicates failure
                    alert('Error: ' + response.message);
                    window.location.href = 'dashboard.html';
                }
            } else {
                // Display error message if AJAX request fails
                alert('Error editing account. Please try again later.');
                window.location.href = 'dashboard.html';
            }
        };

        // Define AJAX onerror function
        xhr.onerror = function () {
            // Display error message
            alert('Error editing patient information');
            window.location.href = 'dashboard.html';
        };

        // Send FormData with AJAX
        xhr.send(formData);
    }
});




