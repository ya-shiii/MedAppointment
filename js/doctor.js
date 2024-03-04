$(document).ready(function () {
    // AJAX request to retrieve session full name
    $.ajax({
        url: 'php/get_fullname.php',
        method: 'GET',
        dataType: 'json', // Parse the response as JSON
        success: function(response) {
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
        error: function() {
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
            { data: 'appointment_id' },
            { data: 'patient_name' },
            { data: 'appointment_datetime' },
            { data: 'status' },
            {
                data: null,
                render: function (data, type, row) {

                    if (row.status === 'pending') {
                        // Return a button for cancel action
                        return '<button class="update-button w-1/2 bg-green-600 text-white px-4 py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Update</button><button class="cancel-button w-1/2 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg mr-2" data-id="' + row.appointment_id + '">Cancel</button>';
                    } else {
                        // Return empty string if status is not 'pending'
                        return '';
                    }
                }
            }
        ],
        columnDefs: [
            {
                targets: 2, // Index of the 'appointment_datetime' column
                render: function (data, type, row) {
                    // Convert data to JavaScript Date object
                    var datetime = new Date(data);

                    // Format date as "Month Day, Year, Day of Week - HH:MM AM/PM"
                    var options = {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        weekday: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                    };
                    var formattedDateTime = datetime.toLocaleDateString('en-US', options);

                    return formattedDateTime;
                }
            }
        ]
    });
    // Update button click handler
    $('#appoTable').on('click', '.update-button', function () {
        var appointment_id = $(this).data('id');
        // Redirect to edit page or perform any other action
        console.log('Update button clicked for Appointment: ' + appointment_id);
    });

    // Cancel button click handler
    $('#appoTable').on('click', '.cancel-button', function () {
        var appointment_id = $(this).data('id');
        // Redirect to edit page or perform any other action
        console.log('Cancel button clicked for Appointment: ' + appointment_id);
    });


});