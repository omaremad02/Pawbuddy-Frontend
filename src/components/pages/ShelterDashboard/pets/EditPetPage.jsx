import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import styles from "./css/AddPetPage.module.css";
import Field from "../../../common/Field";
import Button from "../../../common/Button";
import Dropdown from "../../../common/Dropdown";
import TextComponent from "../../../common/TextComponnet";
import Spinner from "../../../common/Spinner";
import ErrorText from "../../../common/ErrorText";
import axios from "axios";
import endpoints from "../../../../utils/apiEndpoints";
import Swal from "sweetalert2";
import ResponseError from "../../../common/ResponseError";

const EditPetPage = () => {
  const { petId } = useParams(); // Get petId from the URL
  const [petData, setPetData] = useState({
    petId: "",
    name: "",
    type: "Dog",
    breed: "",
    adoptionstatus: "",
    vaccinationstatus: "",
    size: "",
    temperament: "",
    gender: "Male",
    dob: "",
    houseTrained: "Street",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [petNotFound, setPetNotFound] = useState(false);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.post(`${endpoints.GET_PETS}`, {
          shelterId: "60d21b4667d0d8992e610c86", // Replace with your shelter ID
          petId: petId,
        });

        const fetchedData = response.data.pets;

        if (fetchedData && fetchedData.length > 0) {
          const pet = fetchedData[0];
          setPetData({
            petId: pet.petId,
            name: pet.name || "",
            type: pet.type || "Dog",
            breed: pet.breed || "",
            adoptionstatus: pet.adoptionstatus || "",
            vaccinationstatus: pet.vaccinationstatus || "",
            size: pet.size || "",
            temperament: pet.temperament || "",
            age: pet.dob || "",
            gender: pet.gender || "Male",
            dob: pet.dob ? new Date(pet.dob).toISOString().split("T")[0] : "",
            houseTrained: pet.houseTrained || "Street",
          });
          setPetNotFound(false);
        } else {
          setPetNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while fetching pet details.",
          icon: "error",
          confirmButtonText: "OK",
        });
        setPetNotFound(true);
      } finally {
        setIsFetching(false);
      }
    };

    if (petId) {
      fetchPetDetails();
    }
  }, [petId]);

  const handleFieldChange = (field, value) => {
    setPetData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!petData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!petData.breed.trim()) {
      newErrors.breed = "Breed is required";
    }
    if (!petData.dob) {
      newErrors.dob = "Date of Birth is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePet = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${endpoints.EDIT_PET}`, {
        shelterId: "60d21b4667d0d8992e610c86",
        ...petData,
      });
      console.log("Pet updated successfully:", response.data);
      Swal.fire({
        title: "Success!",
        text: "Pet updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating pet:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the pet.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (petNotFound) {
    return (
    <ResponseError></ResponseError>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <div className={styles.editContainer}>
          <TextComponent color="Black" size="36px" weight="bold" align="center">
            Edit Pet
          </TextComponent>

          <Field
            label="Name"
            value={petData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.name} />

          <Dropdown
            label="Type"
            value={petData.type}
            options={[{ value: "Dog", label: "Dog" }, { value: "Cat", label: "Cat" }]}
            onChange={(value) => handleFieldChange("type", value)}
            disabled={isLoading}
          />

          <Field
            label="Breed"
            value={petData.breed}
            onChange={(e) => handleFieldChange("breed", e.target.value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.breed} />

          <Dropdown
            label="Gender"
            value={petData.gender}
            options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]}
            onChange={(value) => handleFieldChange("gender", value)}
            disabled={isLoading}
          />

          <Field
            label="Date of Birth"
            type="date"
            value={petData.dob}
            onChange={(e) => handleFieldChange("dob", e.target.value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.dob} />

          <Dropdown
            label="House Trained"
            value={petData.houseTrained}
            options={[{ value: "Home", label: "Home" }, { value: "Street", label: "Street" }]}
            onChange={(value) => handleFieldChange("houseTrained", value)}
            disabled={isLoading}
          />

          {!isLoading && (
            <Button
              label="Update"
              onClick={updatePet}
              variant="primary"
              style={{ width: "100%", padding: 20 }}
            />
          )}
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default EditPetPage;
