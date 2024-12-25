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


  // shelter 
  ADD_SHELTER: `${API_BASE_URL}/api/shelter/add-shelter-manager`,  // Endpoint to add a pet
  GET_ALL_SHELTERS: `${API_BASE_URL}/api/shelter/get-all-shelters`,  // Endpoint to add a pet
  UPDATE_SHELTER:(id)=> `${API_BASE_URL}/api/shelter/update-shelter/${id}`,  // Endpoint to add a pet
  DELETE_SHELTER:(id)=> `${API_BASE_URL}/api/shelter/delete-shelter/${id}`,  // Endpoint to add a pet

    // pets 
  ADD_PET: `${API_BASE_URL}/api/pet/add_Pet`,  // Endpoint to add a pet
  EDIT_PET:  `${API_BASE_URL}/api/pet/update_pet/`, // Endpoint to edit a pet, dynamically accept pet ID
  GET_PETS: `${API_BASE_URL}/api/pet/get_shelter_pets`, // Endpoint to get all pets
  DELETE_PET:`${API_BASE_URL}/api/pet/delete_pet`, // Endpoint to delete a pet, dynamically accept pet ID
  // Add other endpoints as needed
};

export default endpoints;
