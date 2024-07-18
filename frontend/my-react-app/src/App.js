import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // For update and delete

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1/php2/backend/index.php?action=getStudents');
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('email', email);
    if (file) formData.append('fileToUpload', file);

    if (selectedStudent) {
      formData.append('id', selectedStudent.id);
      formData.append('update', 'true'); // Marking as update
    } else {
      formData.append('create', 'true'); // Marking as create
    }

    try {
      await axios.post('http://127.0.0.1/php2/backend/index.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh students list
      const response = await axios.get('http://127.0.0.1/php2/backend/index.php?action=getStudents');
      if (Array.isArray(response.data)) {
        setStudents(response.data);
        // Reset form fields
        setName('');
        setAge('');
        setEmail('');
        setFile(null);
        setSelectedStudent(null);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error creating/updating student:', error);
    }
  };

  // Handle student edit and delete
  const handleEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setEmail(student.email);
    setSelectedStudent(student);
  };

  const handleDelete = async (id) => {
    try {
      await axios.post('http://127.0.0.1/php2/backend/index.php', new URLSearchParams({ delete: 'true', id }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // Refresh students list
      const response = await axios.get('http://127.0.0.1/php2/backend/index.php?action=getStudents');
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">{selectedStudent ? 'Update' : 'Create'}</button>
        </form>
        <h2>Student List</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.age} - {student.email}
              <img src={`http://127.0.0.1/php2/backend/uploads/${student.profile_image}`} alt="Profile" width="50" />
              <button onClick={() => handleEdit(student)}>Edit</button>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
