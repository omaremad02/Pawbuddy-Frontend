import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { IconButton, Box } from "@mui/material";
import { AddPhotoAlternate, RemoveCircleOutline } from "@mui/icons-material";

const EditPetPage = () => {
  const { petId } = useParams();
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
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [petNotFound, setPetNotFound] = useState(false);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(
          `${endpoints.GET_PETS}?petId=${petId}`,
          { headers: endpoints.getAuthHeader() }
        );

        const fetchedData = response.data.pets;
        if (fetchedData && fetchedData.length > 0) {
          const pet = fetchedData[0];
          setPetData({
            ...pet,
            dob: pet.dob ? new Date(pet.dob).toISOString().split("T")[0] : "",
            images: pet.images || [],
          });
          setPetNotFound(false);
        } else {
          setPetNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
        Swal.fire("Error!", "An error occurred while fetching pet details.", "error");
        setPetNotFound(true);
      } finally {
        setIsFetching(false);
      }
    };

    if (petId) fetchPetDetails();
  }, [petId]);

  const handleFieldChange = (field, value) => {
    setPetData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPetData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setPetData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!petData.name.trim()) newErrors.name = "Name is required";
    if (!petData.breed.trim()) newErrors.breed = "Breed is required";
    if (!petData.dob) newErrors.dob = "Date of Birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePet = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(petData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => {
            formData.append("images", image);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.put(endpoints.EDIT_PET(petId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...endpoints.getAuthHeader(),
        },
      });

      Swal.fire("Success!", "Pet updated successfully!", "success");
    } catch (error) {
      console.error("Error updating pet:", error);
      Swal.fire("Error!", "An error occurred while updating the pet.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <Spinner />;
  if (petNotFound) return <ResponseError />;

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

          <Field
            label="Date of Birth"
            type="date"
            value={petData.dob}
            onChange={(e) => handleFieldChange("dob", e.target.value)}
            disabled={isLoading}
          />
          <ErrorText message={errors.dob} />

          {/* Image Upload Section */}
          <Box mb={2}>
            <label>Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              disabled={isLoading}
              accept="image/*"
            />
          </Box>

          {/* Display Uploaded Images */}
          <Box>
            {petData.images.map((image, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt={`Pet ${index}`}
                  style={{ width: 100, height: 100, objectFit: "cover", marginRight: 8 }}
                />
                <IconButton onClick={() => removeImage(index)}>
                  <RemoveCircleOutline />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Button
            label="Update"
            onClick={updatePet}
            variant="primary"
            style={{ width: "100%", padding: 20 }}
            disabled={isLoading}
          />
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default EditPetPage;
