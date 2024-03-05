$(document).ready(function () {
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
            { data: 'appointment_date' },
            { data: 'time' },
            { data: 'status' },
        ],
        columnDefs: [
            {
                targets: 5, // Index of the 'appointment_datetime' column
                render: function (data, type, row) {
                    // Convert data to JavaScript Date object
                    var date = new Date(data);

                    // Format date as "Month Day, Year, Day of Week - HH:MM AM/PM"
                    var options = {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        weekday: 'long'
                    };
                    var formattedDateTime = date.toLocaleDateString('en-US', options);

                    return formattedDateTime;
                }
            }
        ]
    });
});