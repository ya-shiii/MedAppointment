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
        // Redirect to edit page or perform any other action
        console.log('Edit button clicked for DoctorID: ' + doctorId);
    });

    // Delete button click handler
    $('#docTable').on('click', '.delete-button', function () {
        var doctorId = $(this).data('id');
        // Perform delete operation via AJAX or confirm dialog
        console.log('Delete button clicked for DoctorID: ' + doctorId);
    });


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
        var DoctorTypeID = $(this).data('id');
        // Redirect to edit page or perform any other action
        console.log('Edit button clicked for DoctorID: ' + DoctorTypeID);
    });

    // Delete button click handler
    $('#specTable').on('click', '.delete-button', function () {
        var DoctorTypeID = $(this).data('id');
        // Perform delete operation via AJAX or confirm dialog
        console.log('Delete button clicked for DoctorID: ' + DoctorTypeID);
    });



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
        // Redirect to edit page or perform any other action
        console.log('Edit button clicked for DoctorID: ' + PatientID);
    });

    // Delete button click handler
    $('#patiTable').on('click', '.delete-button', function () {
        var PatientID = $(this).data('id');
        // Perform delete operation via AJAX or confirm dialog
        console.log('Delete button clicked for DoctorID: ' + PatientID);
    });


    // appointments table
    var appotable = $('#appoTable').DataTable({
        ajax: {
            url: 'php/get_appointment.php', 
            dataSrc: ''
        },
        columns: [
            { data: 'appointment_id' },
            { data: 'patient_name' },
            { data: 'doctor_name' },
            { data: 'doctor_type' },
            { data: 'clinic_address' },
            { data: 'appointment_datetime' },
            { data: 'status' },
        ],
        columnDefs: [
            {
                targets: 5, // Index of the 'appointment_datetime' column
                render: function(data, type, row) {
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
});