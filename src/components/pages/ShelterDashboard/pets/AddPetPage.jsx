// AddPetPage.js
import React, { useState } from "react";
import styles from "./css/AddPetPage.module.css";
import Field from "../../../common/Field";
import Button from "../../../common/Button";
import Dropdown from "../../../common/Dropdown";
import TextComponent from "../../../common/TextComponnet";
import Spinner from "../../../common/Spinner"; // Assuming you have a Spinner component
import ErrorText from "../../../common/ErrorText"; // Import ErrorText component
import axios from "axios"; // Import Axios
import endpoints from "../../../../utils/apiEndpoints";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddPetPage = ({ petToEdit,  }) => {
  const [AddPet, setAddPet] = useState(
    petToEdit || {
      name: "",
      type: "Dog",
      breed: "",
      adoptionstatus: "",
      vaccinationstatus: "",
      size: "",
      temperament: "",
      age: "",
      gender: "Male",
      dob: "",
      houseTrained: "Street",
    }
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleFieldChange = (field, value) => {
    setAddPet((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!AddPet.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!AddPet.breed.trim()) {
      newErrors.breed = "Breed is required";
    }

    if (!AddPet.age || AddPet.age <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!AddPet.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!AddPet.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!AddPet.type) {
      newErrors.type = "Type is required";
    }

    if (!AddPet.houseTrained) {
      newErrors.houseTrained = "House trained status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const savePet = async (petData) => {
    if (!validateFields()) return;

    setIsLoading(true); // Show loading indicator
    try {
      const response = await axios.post(endpoints.ADD_PET, {
        
        shelterId: "60d21b4667d0d8992e610c86", // Replace with a valid shelter ID from your database
        type: petData.type,
        gender: petData.gender,
        dob: new Date(petData.dob).toISOString(),
        houseTrained: petData.houseTrained,
        name: petData.name,
        breed: petData.breed,
      });

      console.log("Pet saved successfully:", response.data);
      // Using SweetAlert for success
      Swal.fire({
        title: "Success!",
        text: "Pet saved successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error saving pet:", error);
      // Using SweetAlert for error
      Swal.fire({
        title: "Error!",
        text: "An error occurred while saving the pet.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <div className={styles.editContainer}>
        <TextComponent 
  color= 'Black'
  size="36px" 
  weight="bold" 
  align="center"
>
  Add Pet
</TextComponent>          {/* Name Field */}
          <Field
            label="Name"
            value={AddPet.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.name} /> {/* Show error for name */}

          {/* Type Dropdown */}
          <Dropdown
            label="Type"
            value={AddPet.type}
            options={[{ value: "Dog", label: "Dog" }, { value: "Cat", label: "Cat" }]}
            onChange={(value) => handleFieldChange("type", value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.type} /> {/* Show error for type */}

          {/* Breed Field */}
          <Field
            label="Breed"
            value={AddPet.breed}
            onChange={(e) => handleFieldChange("breed", e.target.value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.breed} /> {/* Show error for breed */}

          {/* Gender Dropdown */}
          <Dropdown
            label="Gender"
            value={AddPet.gender}
            options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]}
            onChange={(value) => handleFieldChange("gender", value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.gender} /> {/* Show error for gender */}

          {/* Date of Birth Field */}
          <Field
            label="Date of Birth"
            type="date"
            value={AddPet.dob}
            onChange={(e) => handleFieldChange("dob", e.target.value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.dob} /> {/* Show error for dob */}

          {/* House Trained Dropdown */}
          <Dropdown
            label="House Trained"
            value={AddPet.houseTrained}
            options={[{ value: "Home", label: "Home" }, { value: "Street", label: "Street" }]}
            onChange={(value) => handleFieldChange("houseTrained", value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.houseTrained} /> {/* Show error for houseTrained */}

          {/* Age Field */}
          <Field
            label="Age"
            type="number"
            value={AddPet.age}
            onChange={(e) => handleFieldChange("age", parseInt(e.target.value, 10) || "")}
            disabled={isLoading}
          />
          <ErrorText message={errors.age} /> {/* Show error for age */}

          {/* Save Button */}
          {!isLoading && (
            <Button
              label="Save"
              onClick={() => savePet(AddPet)}
              variant="primary"
              style={{ width: '100%' ,padding:20 }}  // This will make the button take full screen width

            />
          )}

          {/* Loading Indicator */}
          {isLoading && <Spinner />} {/* Assuming Spinner is a component for loading */}
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;
