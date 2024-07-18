# Student Management System

A simple CRUD (Create, Read, Update, Delete) application for managing student records.
using php for the backend, react for the frontend and MySQL as the database.

## Features
* Create new student records
* Read and display student records with images
* Update existing student records
* Delete student records


## Installation
### Step 1: Clone the repository
`git clone https://github.com/almogrr/PHP_CRUD.git`

### Step 2: Set up the backend
1. Download WampServer and install it.
2. Create a new folder (e.g., `student-management-system`) and copy the contents of the backend folder to it.
3. Update the database connection settings in `config.php`.

### Step 3: Set up the database
1. Open phpMyAdmin and create a new database (e.g., `student_management`).
2. Import the `student_management.sql` file to create the necessary tables.

### Step 4: Open the application
1. Ensure WampServer is running.
2. Open a web browser and navigate to `http://127.0.0.1/student-management-system/index.php`.

### Frontend Setup
1. Navigate to the frontend folder.
2. Install the required npm packages with `npm install`.
3. Start the React development server with `npm start`.

### Usage
#### Adding a Student
1. Fill in the student details in the form.
2. Click the Create button to add the student to the database.

#### Updating a Student
1. Click the Edit button next to the student you want to update.
2. Update the necessary fields and click the Update button to save changes.

#### Deleting a Student
1. Click the Delete button next to the student you want to remove.
2. The student will be removed from the database.

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.