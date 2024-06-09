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
                $('#doctor-name').text(fullname);
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
            url: 'php/get_doctor-appointment.php',
            dataSrc: ''
        },
        columns: [
            { data: 'appointment_id', type: 'num' }, // Numeric type for appointment_id
            {
                data: null,
                render: function (data, type, row) {
                    const imageName = row.patient_name.replace(/ /g, '_');
                    return '<img src="patient/' + imageName + '.jpg" alt="' + row.patient_name + '" width="100" height="100">';
                }
            },
            { data: 'patient_name' },
            { data: 'appointment_date', type: 'date' }, // Date type for appointment_date
            { data: 'time' },
            { data: 'status' },
            {
                data: null,
                render: function (data, type, row) {
                    const compbtn = '<button class="complete-button w-2/3 mt-2 bg-green-600 text-white px-2 text-center py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Mark Complete</button>'
                    const confirmbtn = '<button class="confirm-button w-2/3 mt-2 bg-green-600 text-white px-2 text-center py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Confirm</button>'
                    const reschedbtn = '<button class="update-button w-2/3 mt-2 bg-blue-600 text-white px-2 text-center py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Reschedule</button>'
                    const cancelbtn = '<button class="cancel-button w-2/3 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Cancel</button>'

                    if ((row.status === 'pending')&&(row.doc_app === 'pending')) {
                        // Return a button for cancel action
                        return confirmbtn + reschedbtn + cancelbtn;
                    } else if ((row.status === 'pending')&&(row.doc_app === 'yes')) {
                        // Return a button for cancel action
                        return reschedbtn + cancelbtn;
                    } else if ((row.status === 'reschedule')&&(row.doc_app === 'yes')) {
                        return cancelbtn;
                    } else if (row.status === 'confirmed') {
                        return compbtn;

                    } else {
                        // Return empty string if status is not 'pending'
                        return '';
                    }
                }
            }
        ],
        columnDefs: [
            {
                targets: 3, // Index of the 'appointment_date' column
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
        order: [[3, 'asc']] // Order by the 'appointment_date' column ascending
    });



    // Complete button click handler
    $('#appoTable').on('click', '.complete-button', function () {
        var appointment_id = $(this).data('id');

        // Ask the user for confirmation
        var confirmComplete = confirm('Mark this appointment as done?');
        if (!confirmComplete) {
            // If the user cancels the action, return
            return;
        }

        // Send AJAX request to update the status to "cancelled"
        $.ajax({
            url: 'php/update_appointment_status.php',
            method: 'POST',
            data: {
                appointment_id: appointment_id,
                status: 'completed'
            },
            success: function (response) {
                // If the update is successful, reload the DataTable
                console.log('Appointment ' + appointment_id + ' has been marked complete.');
                alert('Appointment has been marked complete.');
                location.reload();
            },
            error: function (xhr, status, error) {
                // If there's an error, log it to the console
                console.error('Error completing appointment:', error);
                alert('Error completing appointment:', error);
                location.reload();
            }
        });
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
                $('#edit_username').val(appointment.patient_name);
                $('#app_date').val(appointment.appointment_date);
                $('#app_time').val(appointment.time);
                // Show the modal
                $('#updateModal').removeClass('hidden');
            },
            error: function (xhr, status, error) {
                console.error('Error fetching appointment details:', error);
                // Optionally, display an error message to the user
            }
        });
    });

    // confirm button click handler
    $('#appoTable').on('click', '.confirm-button', function () {
        var appointment_id = $(this).data('id');

        // Ask the user for confirmation
        var confirmCancel = confirm('Are you sure you want to confirm this appointment?');
        if (!confirmCancel) {
            // If the user cancels the action, return
            return;
        }

        // Send AJAX request to update the status to "cancelled"
        $.ajax({
            url: 'php/update_appointment_status_doc.php',
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




    // appointments table
    var allappotable = $('#allAppoTable').DataTable({
        ajax: {
            url: 'php/get_doctor-appointment-all.php',
            dataSrc: ''
        },
        columns: [
            { data: 'appointment_id', type: 'num' }, // Numeric type for appointment_id
            { data: 'patient_name' },
            { data: 'appointment_date', type: 'date' }, // Date type for appointment_date
            { data: 'time' },
            { data: 'status' }
        ],
        columnDefs: [
            {
                targets: 2, // Index of the 'appointment_date' column
                render: function (data, type, row) {
                    var appointmentDate = new Date(data);

                    var options = {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    };

                    return appointmentDate.toLocaleDateString('en-US', options);

                }
            }
        ],
        order: [[2, 'asc']] // Order by the 'appointment_date' column ascending
    });
});

// Function to close the modal
function cancelUpdateModal() {
    // Hide the modal by adding the 'hidden' class
    document.getElementById('updateModal').classList.add('hidden');
    document.getElementById('time-message').textContent = 'Please select time. Only 2 slots per hour.';
    document.getElementById('time-message').style.color = '';
    document.getElementById('date-message').textContent = 'Please select a date.';
    document.getElementById('date-message').style.color = '';
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the date input element
    const appDateInput = document.getElementById('app_date');
    // Get the time select element
    const appTimeSelect = document.getElementById('app_time');
    // Get the time message element
    const timeMessage = document.getElementById('time-message');
    // Get the submit button
    const submitButton = document.querySelector('button[type="submit"]');
    // Get the date message element
    const dateMessage = document.getElementById('date-message');

    // Add event listener for date input change
    appDateInput.addEventListener('change', function () {
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
            dateMessage.textContent = 'Please select a date.';
            // Reset the text color
            dateMessage.style.color = ''; // Reset to default

            // Get the selected time value
            const selectedTime = appTimeSelect.value;

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
                            timeMessage.textContent = 'Two appointments already scheduled for this time. Please select another time.';
                            // Change the text color to red
                            timeMessage.style.color = 'red';
                        } else {
                            // Enable the submit button
                            submitButton.disabled = false;
                            // Reset the time message
                            timeMessage.textContent = 'Please select time. Only 2 slots per hour.';
                            // Reset the text color
                            timeMessage.style.color = ''; // Reset to default
                        }
                    },
                    error: function (xhr, status, error) {
                        // If there's an error, log it to the console
                        console.error('Error checking existing appointments:', error);
                        // Show a generic error message
                        timeMessage.textContent = 'Error checking existing appointments. Please try again.';
                        // Change the text color to red
                        timeMessage.style.color = 'red';
                    }
                });
            }
        } else {
            // Disable the submit button
            submitButton.disabled = true;
            // Change the date message
            dateMessage.textContent = 'Selected date must be tomorrow or later, and weekdays only.';
            // Change the text color to red
            dateMessage.style.color = 'red';
            // Reset the time message
            timeMessage.textContent = 'Please select time. Only 2 slots per hour.';
            // Reset the text color
            timeMessage.style.color = ''; // Reset to default
        }
    });


    // Add event listener for time select change
    appTimeSelect.addEventListener('change', function () {
        // Get the selected time value
        const selectedTime = this.value;
        // Get the selected date value
        const selectedDate = document.getElementById('app_date').value;

        // Check if both time and date are selected
        if (selectedTime && selectedDate) {
            // Send AJAX request to check for existing appointments
            $.ajax({
                url: 'php/check_existing_appointments.php',
                method: 'POST',
                data: {
                    appointment_date: selectedDate,
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
                        timeMessage.textContent = 'Two appointments already scheduled for this time. Please select another time.';
                        // Change the text color to red
                        timeMessage.style.color = 'red';
                    } else {
                        // Enable the submit button
                        submitButton.disabled = false;
                        // Reset the time message
                        timeMessage.textContent = 'Please select time. Only 2 slots per hour.';
                        // Reset the text color
                        timeMessage.style.color = ''; // Reset to default
                    }
                },
                error: function (xhr, status, error) {
                    // If there's an error, log it to the console
                    console.error('Error checking existing appointments:', error);
                    // Show a generic error message
                    timeMessage.textContent = 'Error checking existing appointments. Please try again.';
                    // Change the text color to red
                    timeMessage.style.color = 'red';
                }
            });
        }

    });

});

// Function to toggle between showing all appointments and returning to the previous state
function toggleAppointments() {
    var switchBtn = document.getElementById('switchbtn');
    var appoTableContainer = document.getElementById('appoTableContainer');
    var allAppoTableContainer = document.getElementById('allAppoTableContainer');

    if (switchBtn.textContent === 'Show All Appointments') {
        // Hide appoTable and show allAppoTable
        appoTableContainer.classList.add('hidden');
        allAppoTableContainer.classList.remove('hidden');
        // Change button text to 'Return'
        switchBtn.textContent = 'Return';
    } else {
        // Hide allAppoTable and show appoTable
        allAppoTableContainer.classList.add('hidden');
        appoTableContainer.classList.remove('hidden');
        // Change button text to 'Show All Appointments'
        switchBtn.textContent = 'Show All Appointments';
    }
}

// Event listener for the switch button
document.getElementById('switchbtn').addEventListener('click', function (event) {
    // Prevent the default action of the anchor tag
    event.preventDefault();
    // Call the toggleAppointments function
    toggleAppointments();
});



