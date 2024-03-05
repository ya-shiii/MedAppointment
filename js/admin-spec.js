$(document).ready(function () {
    // doctor types table
    var typetable = $('#specTable').DataTable({
        ajax: {
            url: 'php/get_doctor-types_list.php',
            dataSrc: ''
        },
        columns: [
            { data: 'DoctorTypeID' },
            { data: 'TypeName' },
            { data: 'Description' },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="edit-button w-full bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" data-id="' + row.DoctorTypeID + '">Edit</button><button class="delete-button w-full bg-red-500 text-white px-4 py-2 rounded-lg mr-2 mt-1" data-id="' + row.DoctorTypeID + '">Delete</button>';
                }
            }
        ]
    });

    // Edit button click handler
    $('#specTable').on('click', '.edit-button', function () {
        var doctorTypeID = $(this).data('id');
        // Perform AJAX request to fetch field details
        $.ajax({
            url: 'php/get-field-details.php',
            method: 'POST',
            data: { doctorTypeID: doctorTypeID },
            dataType: 'json',
            success: function (response) {
                // Fill input fields with retrieved field details\
                $('#edit-field_id').val(response.field_id);
                $('#edit-field_name').val(response.field_name);
                $('#edit-description').val(response.description);

                // Show the edit modal
                $('#editSpecModal').removeClass('hidden');
            },
            error: function () {
                console.error('Error occurred while fetching field details');
            }
        });
    });


    // Delete button click handler
    $('#specTable').on('click', '.delete-button', function () {
        var doctorTypeID = $(this).data('id');

        // Confirm deletion with user
        if (confirm('Are you sure you want to delete this field?')) {
            // Send AJAX request to delete-field.php
            $.ajax({
                url: 'php/delete-field.php',
                method: 'POST',
                data: { doctorTypeID: doctorTypeID },
                success: function (response) {
                    // Handle success response
                    console.log('Field deleted successfully');
                    alert('Field deleted successfully');
                    location.reload();
                },
                error: function () {
                    // Handle error response
                    console.error('Error occurred while deleting field');
                    alert('Error occurred while deleting field');
                    location.reload();
                }
            });
        }
    });
});



// Function to open the modal
function openSpecModal() {
    // Show the modal by adding the 'hidden' class
    document.getElementById('addSpecModal').classList.remove('hidden');
}
// Function to close the modal
function cancelSpecModal() {
    // Hide the modal by adding the 'hidden' class
    document.getElementById('addSpecModal').classList.add('hidden');
    document.getElementById('editSpecModal').classList.add('hidden');
}

// Add event listener to the buttons
document.getElementById('AddSpec').addEventListener('click', openSpecModal);