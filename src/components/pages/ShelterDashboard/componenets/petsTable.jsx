import React, { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton, Button, Modal, Box } from '@mui/material';
import NoImageIcon from '@mui/icons-material/NoImage';

const PetTable = ({ pets, page, rowsPerPage, handleEdit, handleDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for full view

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the selected image URL for modal display
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Close the modal by resetting the selected image
  };

  return (
    <>
      <TableBody>
        {pets
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((pet) => (
            <TableRow key={pet.petId} hover>
              <TableCell>{pet.name}</TableCell>
              <TableCell>
                {pet.images && pet.images.length > 0 ? (
                  pet.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={pet.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        marginLeft: 10, // Add left margin to the image
                        cursor: 'pointer', // Make it clickable
                      }}
                      onClick={() => handleImageClick(image.url)} // Show full image on click
                    />
                  ))
                ) : (
                  <IconButton>
                    <NoImageIcon color="disabled" />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>{pet.type}</TableCell>
              <TableCell>{pet.breed}</TableCell>
              <TableCell>{pet.houseTrained ? 'Yes' : 'No'}</TableCell>
              <TableCell>{pet.age}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(pet.petId)}
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(pet.petId)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>

      {/* Modal to display the full image */}
      <Modal
        open={Boolean(selectedImage)}
        onClose={handleCloseModal}
        aria-labelledby="full-image-modal"
        aria-describedby="modal-to-show-full-image"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 2,
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
            boxShadow: 24,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full pet"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain', // Ensure the full image is visible within the modal
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PetTable;
