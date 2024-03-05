$(document).ready(function () {
    // patients table
    var patitable = $('#patiTable').DataTable({
        ajax: {
            url: 'php/get_patients_list.php',
            dataSrc: ''
        },
        columns: [
            { data: 'PatientID' },
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
        ]
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