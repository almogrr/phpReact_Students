import axios from 'axios';

const API_URL = 'http://127.0.0.1/php2/backend'; // Update with your PHP backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createStudent = async (studentData) => {
  try {
    const response = await api.post('/createStudent.php', studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (studentData) => {
  try {
    const response = await api.post('/updateStudent.php', studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.post('/deleteStudent.php', { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get('/getStudents.php');
    return response.data;
  } catch (error) {
    throw error;
  }
};
