// apiEndpoints.js

//  sever url 
// const API_BASE_URL = "https://your-api-url.com"; // Replace with your actual API base URL

//  local url 
const API_BASE_URL = "http://localhost:3000"; // Replace with your actual API base URL
//  local url 
// const API_BASE_URL = "http://localhost:5000"; // Replace with your actual API base URL

const endpoints = {
  getAuthHeader:() => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  // auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,  // Endpoint to add a pet
  getUserWithToken: `${API_BASE_URL}/api/auth/getUserWithToken`,  // Endpoint to add a pet


  // shelter staff
  GET_ALL_STAFF: `${API_BASE_URL}/api/shelter/get-shelter-staff`,  // Endpoint to add a pet
  DELETE_STAFF:(id)=> `${API_BASE_URL}/api/shelter/delete-shelter-staff/${id}`,  // Endpoint to add a pet
  UPDATE_STAFF:(id)=> `${API_BASE_URL}/api/shelter/update-shelter-staff/${id}`,  // Endpoint to add a pet
  ADD_STAFF: `${API_BASE_URL}/api/shelter/add-shelter-staff`,  // Endpoint to add a pet

 
// users
GET_ALL_USERS: `${API_BASE_URL}/api/user/get-all-users`,  // Endpoint to add a pet
UPDATE_USER:(id)=> `${API_BASE_URL}/api/user/update-user/${id}`,  // Endpoint to add a pet
DELETE_USER:(id)=> `${API_BASE_URL}/api/user/delete-user/${id}`,  // Endpoint to add a pet


  // shelter 
  ADD_SHELTER: `${API_BASE_URL}/api/shelter/add-shelter-manager`,  // Endpoint to add a pet
  GET_ALL_SHELTERS: `${API_BASE_URL}/api/shelter/get-all-shelters`,  // Endpoint to add a pet
  UPDATE_SHELTER:(id)=> `${API_BASE_URL}/api/shelter/update-shelter/${id}`,  // Endpoint to add a pet
  DELETE_SHELTER:(id)=> `${API_BASE_URL}/api/shelter/delete-shelter/${id}`,  // Endpoint to add a pet

    // pets 
  ADD_PET: `${API_BASE_URL}/api/pet/add_Pet`,  // Endpoint to add a pet
  EDIT_PET: (id)=>  `${API_BASE_URL}/api/pet/update_pet/${id}`, // Endpoint to edit a pet, dynamically accept pet ID
  GET_PETS: `${API_BASE_URL}/api/pet/get_shelter_pets`, // Endpoint to get all pets
  DELETE_PET:(id)=> `${API_BASE_URL}/api/pet/delete_pet/${id}`, // Endpoint to delete a pet, dynamically accept pet ID
  // Add other endpoints as needed
};

export default endpoints;
