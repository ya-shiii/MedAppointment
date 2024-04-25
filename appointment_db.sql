-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2024 at 02:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointment_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctortypes`
--

CREATE TABLE `doctortypes` (
  `DoctorTypeID` int(11) NOT NULL,
  `TypeName` varchar(50) NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctortypes`
--

INSERT INTO `doctortypes` (`DoctorTypeID`, `TypeName`, `Description`) VALUES
(1, 'Neurology', 'Specializes in disorders of the nervous system, including the brain, spinal cord, and nerves.'),
(2, 'Cardiology', 'Specializes in the diagnosis and treatment of heart diseases and conditions.'),
(3, 'Orthopedics', 'Specializes in the treatment of musculoskeletal system disorders, including bones, joints, ligaments, tendons, and muscles.'),
(4, 'Dermatology', 'Specializes in the diagnosis and treatment of skin disorders and diseases.'),
(5, 'Oncology', 'Specializes in the diagnosis and treatment of cancer.'),
(6, 'Pediatrics', 'Specializes in the medical care of infants, children, and adolescents.'),
(7, 'Gynecology', 'Specializes in the health of the female reproductive system.'),
(8, 'Urology', 'Specializes in the diagnosis and treatment of disorders of the male and female urinary tract and the male reproductive system.'),
(9, 'Ophthalmology', 'Specializes in the diagnosis and treatment of eye disorders and diseases.'),
(10, 'Psychiatry', 'Specializes in the diagnosis, treatment, and prevention of mental health disorders.');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_list`
--

CREATE TABLE `doctor_list` (
  `DoctorID` int(11) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `ClinicAddress` varchar(255) DEFAULT NULL,
  `DoctorType` varchar(50) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_list`
--

INSERT INTO `doctor_list` (`DoctorID`, `FullName`, `Email`, `Phone`, `ClinicAddress`, `DoctorType`, `Username`, `Password`) VALUES
(1, 'Dr. John Doe', 'john.doe@example.com', '123', '123 Main St, City, Country', 'Neurology', 'doc1', 'doc1'),
(2, 'Dr. Emily Johnson', 'emily.johnson@example.com', '234', '456 Elm St, City, Country', 'Neurology', 'emily_johnson', 'neurologist456'),
(3, 'Dr. Michael Lee', 'michael.lee@example.com', '345', '789 Oak St, City, Country', 'Neurology', 'michael_lee', 'neurologist789'),
(4, 'Dr. Sarah Brown', 'sarah.brown@example.com', '456', '321 Maple St, City, Country', 'Cardiology', 'sarah_brown', 'cardiologist123'),
(5, 'Dr. David Garcia', 'david.garcia@example.com', '567-890-1234', '654 Pine St, City, Country', 'Cardiology', 'david_garcia', 'cardiologist456'),
(6, 'Dr. Jennifer Martinez', 'jennifer.martinez@example.com', '678-901-2345', '987 Cedar St, City, Country', 'Cardiology', 'jennifer_martinez', 'cardiologist789'),
(7, 'Dr. William Wilson', 'william.wilson@example.com', '789-012-3456', '741 Birch St, City, Country', 'Orthopedics', 'william_wilson', 'orthopedist123'),
(8, 'Dr. Linda Anderson', 'linda.anderson@example.com', '890-123-4567', '852 Spruce St, City, Country', 'Orthopedics', 'linda_anderson', 'orthopedist456'),
(9, 'Dr. Christopher Thomas', 'christopher.thomas@example.com', '901-234-5678', '963 Fir St, City, Country', 'Orthopedics', 'christopher_thomas', 'orthopedist789'),
(10, 'Dr. Samantha White', 'samantha.white@example.com', '012-345-6789', '147 Pineapple St, City, Country', 'Dermatology', 'samantha_white', 'dermatologist123'),
(11, 'Dr. Daniel Martinez', 'daniel.martinez@example.com', '123-456-7890', '258 Orange St, City, Country', 'Dermatology', 'daniel_martinez', 'dermatologist456'),
(12, 'Dr. Amanda Clark', 'amanda.clark@example.com', '234-567-8901', '369 Banana St, City, Country', 'Dermatology', 'amanda_clark', 'dermatologist789'),
(13, 'Dr. James Taylor', 'james.taylor@example.com', '345-678-9012', '456 Grape St, City, Country', 'Oncology', 'james_taylor', 'oncologist123'),
(14, 'Dr. Olivia Hernandez', 'olivia.hernandez@example.com', '456-789-0123', '567 Lemon St, City, Country', 'Oncology', 'olivia_hernandez', 'oncologist456'),
(15, 'Dr. Ethan Nguyen', 'ethan.nguyen@example.com', '567-890-1234', '678 Lime St, City, Country', 'Oncology', 'ethan_nguyen', 'oncologist789'),
(16, 'Dr. Sophia Martinez', 'sophia.martinez@example.com', '678-901-2345', '789 Cherry St, City, Country', 'Pediatrics', 'sophia_martinez', 'pediatrician123'),
(17, 'Dr. Benjamin Rodriguez', 'benjamin.rodriguez@example.com', '789-012-3456', '890 Blueberry St, City, Country', 'Pediatrics', 'benjamin_rodriguez', 'pediatrician456'),
(18, 'Dr. Ava Wilson', 'ava.wilson@example.com', '890-123-4567', '901 Raspberry St, City, Country', 'Pediatrics', 'ava_wilson', 'pediatrician789'),
(19, 'Dr. Mia Brown', 'mia.brown@example.com', '901-234-5678', '012 Cranberry St, City, Country', 'Gynecology', 'mia_brown', 'gynecologist123'),
(20, 'Dr. Samuel Thomas', 'samuel.thomas@example.com', '012-345-6789', '123 Blackberry St, City, Country', 'Gynecology', 'samuel_thomas', 'gynecologist456'),
(21, 'Dr. Chloe Davis', 'chloe.davis@example.com', '123-456-7890', '234 Strawberry St, City, Country', 'Gynecology', 'chloe_davis', 'gynecologist789'),
(22, 'Dr. Logan Wilson', 'logan.wilson@example.com', '234-567-8901', '345 Watermelon St, City, Country', 'Urology', 'logan_wilson', 'urologist123'),
(23, 'Dr. Grace Garcia', 'grace.garcia@example.com', '345-678-9012', '456 Kiwi St, City, Country', 'Urology', 'grace_garcia', 'urologist456'),
(24, 'Dr. Jackson Rodriguez', 'jackson.rodriguez@example.com', '456-789-0123', '567 Pear St, City, Country', 'Urology', 'jackson_rodriguez', 'urologist789'),
(25, 'Dr. Lily Anderson', 'lily.anderson@example.com', '567-890-1234', '678 Mango St, City, Country', 'Ophthalmology', 'lily_anderson', 'ophthalmologist123'),
(26, 'Dr. Noah Taylor', 'noah.taylor@example.com', '678-901-2345', '789 Papaya St, City, Country', 'Ophthalmology', 'noah_taylor', 'ophthalmologist456'),
(27, 'Dr. Mia Hernandez', 'mia.hernandez@example.com', '789-012-3456', '890 Guava St, City, Country', 'Ophthalmology', 'mia_hernandez', 'ophthalmologist789'),
(28, 'Dr. Lucas Martinez', 'lucas.martinez@example.com', '890-123-4567', '901 Pineapple St, City, Country', 'Psychiatry', 'lucas_martinez', 'psychiatrist123'),
(29, 'Dr. Ella Brown', 'ella.brown@example.com', '901-234-5678', '012 Coconut St, City, Country', 'Psychiatry', 'ella_brown', 'psychiatrist456'),
(30, 'Dr. Oliver Wilson', 'oliver.wilson@example.com', '012-345-6789', '123 Date St, City, Country', 'Psychiatry', 'oliver_wilson', 'psychiatrist789'),
(36, 'Joshua Jumamil Vicente', 'gamerotaku80085@yahoo.com', '9516545327', 'Isidro D. Tan, Tangub City', 'Cardiology', 'joshii', 'joshii'),
(37, 'asdfasdf asdfasdf asdfasdf', 'asdf@asdfaa', '23214124', '222asdfae 21asd', 'Neurology', 'user11', 'user11');

-- --------------------------------------------------------

--
-- Table structure for table `medical_appointment`
--

CREATE TABLE `medical_appointment` (
  `appointment_id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `doctor_type` varchar(100) DEFAULT NULL,
  `clinic_address` varchar(255) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `time` enum('8:00 - 9:00 AM','9:00 - 10:00 AM','10:00 - 11:00 AM','11:00-12:00 AM','1:00 - 2:00 PM','2:00 - 3:00 PM','3:00 - 4:00 PM') NOT NULL,
  `status` enum('pending','completed','cancelled','confirmed','reschedule') DEFAULT NULL,
  `doc_app` enum('pending','yes','no') NOT NULL DEFAULT 'pending',
  `pat_app` enum('pending','yes','no') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_appointment`
--

INSERT INTO `medical_appointment` (`appointment_id`, `patient_id`, `patient_name`, `doctor_id`, `doctor_name`, `doctor_type`, `clinic_address`, `appointment_date`, `time`, `status`, `doc_app`, `pat_app`) VALUES
(12, 1, 'John Smith', 1, 'Dr. John Doe', 'Neurology', '123 Main St, City, Country', '2024-04-26', '8:00 - 9:00 AM', 'pending', 'pending', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `patients_list`
--

CREATE TABLE `patients_list` (
  `PatientID` int(11) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients_list`
--

INSERT INTO `patients_list` (`PatientID`, `FullName`, `Username`, `Password`, `Email`, `Age`, `Gender`, `Address`) VALUES
(1, 'John Smiths', 'user1', 'user1', 'john@example.com', 35, 'Male', '123 Main St, City, Country'),
(2, 'Emily Johnson', 'user2', 'user2', 'emily@example.com', 28, 'Female', '456 Elm St, City, Country'),
(3, 'Michael Lee', 'user3', 'user3', 'michael@example.com', 45, 'Male', '789 Oak St, City, Country'),
(6, 'Joshua Jumamil Vicente', 'user4', 'user4', 'gamerotaku80085@yahoo.cc', 22, 'Male', 'Isidro D. Tan, Tangub City'),
(24, 'Emily Johnson', 'user5', 'user5', 'emily@example.com', 28, 'Male', '456 Elm St, City, Country'),
(25, 'aasdfasdf', 'user6', 'user6', 'asdf@asdf', 22, 'Male', 'asdfasdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctortypes`
--
ALTER TABLE `doctortypes`
  ADD PRIMARY KEY (`DoctorTypeID`);

--
-- Indexes for table `doctor_list`
--
ALTER TABLE `doctor_list`
  ADD PRIMARY KEY (`DoctorID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `medical_appointment`
--
ALTER TABLE `medical_appointment`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `patients_list`
--
ALTER TABLE `patients_list`
  ADD PRIMARY KEY (`PatientID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctortypes`
--
ALTER TABLE `doctortypes`
  MODIFY `DoctorTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `doctor_list`
--
ALTER TABLE `doctor_list`
  MODIFY `DoctorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `medical_appointment`
--
ALTER TABLE `medical_appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `patients_list`
--
ALTER TABLE `patients_list`
  MODIFY `PatientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
