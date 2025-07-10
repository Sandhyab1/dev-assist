import axios from "axios";


const API_BASE_URL = "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((req) => {
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('user')}`;
  }

  return req;
});


export const fetchUsers = () => API.get('/auth/getUsers');
export const updateUsersBulk = (data) => API.post('/auth/updateUsers', data);