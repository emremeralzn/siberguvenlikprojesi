import axios from 'axios';

const BASE_URL = 'http://localhost:5079/api';

// **User API Calls**
export const fetchUsers = () => axios.get(`${BASE_URL}/user`).then(res => res.data);
export const fetchUser = (id) => axios.get(`${BASE_URL}/user/${id}`).then(res => res.data);
export const createUser = (user) => axios.post(`${BASE_URL}/user`, user).then(res => res.data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/user/${id}`);

// **EducationContent API Calls**
export const fetchEducationContents = () => axios.get(`${BASE_URL}/educationContent`).then(res => res.data);
export const addEducationContent = (educationContent) => 
    axios.post(`${BASE_URL}/educationContent`, educationContent).then(res => res.data);

export const fetchUserSimulationLogs = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}/simulationLogs`);
  return response.data;
};