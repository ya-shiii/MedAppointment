$(document).ready(function () {
    // Doctors Datatable
    var doctable = $('#docTable').DataTable({
        ajax: {
            url: 'php/get_doctor_list.php',
            dataSrc: ''
        },
        columns: [
            { data: 'DoctorID' },
            { data: 'FullName' },
            { data: 'Email' },
            { data: 'Phone' },
            { data: 'ClinicAddress' },
            { data: 'DoctorType' },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="edit-button w-full bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" data-id="' + row.DoctorID + '">Edit</button><button class="delete-button w-full bg-red-500 text-white px-4 py-2 rounded-lg mr-2 mt-1" data-id="' + row.DoctorID + '">Delete</button>';
                }
            }
        ]
    });

    // Edit button click handler
    $('#docTable').on('click', '.edit-button', function () {
        var doctorId = $(this).data('id');

        // AJAX request to fetch doctor details
        $.ajax({
            url: 'php/get-doctor-details.php', // Update with the correct PHP file to fetch doctor details
            method: 'POST',
            data: { doctor_id: doctorId },
            dataType: 'json',
            success: function (response) {
                // Fill the form fields with doctor details
                $('#edit_id').val(response.doctor_id);
                $('#edit_username').val(response.username);
                $('#edit_password').val(response.password);
                $('#edit_full_name').val(response.full_name);
                $('#edit_email').val(response.email);
                $('#edit_phone').val(response.phone);
                $('#edit_address').val(response.address);
                $('#edit_type').val(response.type);

                // Show the modal
                $('#editDocModal').removeClass('hidden');
            },
            error: function (xhr, status, error) {
                console.error('Error occurred while fetching doctor details:', error);
                // Handle error condition
            }
        });
    });

    // Delete button click handler
    $('#docTable').on('click', '.delete-button', function () {
        var doctorId = $(this).data('id');
        // Confirm deletion
        if (confirm('Are you sure you want to delete this doctor?')) {
            // Send AJAX request
            $.ajax({
                url: 'php/delete-doctor.php', // Path to your PHP script
                method: 'POST',
                data: { doctorId: doctorId }, // Data to send
                success: function (response) {
                    // Handle success response
                    console.log(response); // Log response to console
                    alert("Doctor deleted successfully"); window.location.href = "admin-doctors.html";
                },
                error: function (xhr, status, error) {
                    // Handle error
                    console.error('Error occurred while deleting doctor:', error);
                    alert("Error occurred while deleting doctor"); window.location.href = "admin-doctors.html";
                }
            });
        }
    });


    // Fetch data for dropdown
    $.ajax({
        url: 'php/get_doctortypes.php',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            // Populate the dropdown with fetched data
            response.forEach(function (item) {
                $('#add_type').append(`<option value="${item.TypeName}">${item.TypeName}</option>`);
                $('#edit_type').append(`<option value="${item.TypeName}">${item.TypeName}</option>`);
            });
        },
        error: function () {
            console.error('Error occurred while fetching doctortypes');
        }
    });


});

// Function to open the modal
function openDocModal() {
    // Show the modal by adding the 'hidden' class
    document.getElementById('addDocModal').classList.remove('hidden');
}
// Function to close the modal
function cancelDocModal() {
    // Hide the modal by adding the 'hidden' class
    document.getElementById('addDocModal').classList.add('hidden');
    document.getElementById('editDocModal').classList.add('hidden');
}


// Add event listener to the buttons
document.getElementById('AddDoc').addEventListener('click', openDocModal);