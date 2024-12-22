// src/components/pages/ShowAllPetsPage.jsx
import React, { useState } from "react";
import Button from "../../../common/Button";
import Table from "../../../common/Table";
import styles from "./css/ShowAllPetsPage.module.css";
import Field from "../../../common/Field";


const initialPets = [
  { id: 1, name: "Rocky", type: "Dog", breed:"Golden Retriever", age: 3, adoptionstatus: "For Adoption", vaccinationstatus: "Vaccinated", size: "57 cm", temperament:"Playful" },
  { id: 2, name: "Momo", type: "Cat", breed:"Siamese", age: 2, adoptionstatus: "For Adoption", vaccinationstatus: "Not Vaccinated", size: "23 cm", temperament:"Chill" },
  { id: 3, name: "Hamo", type: "Dog", breed:"German Shepherd", age: 3, adoptionstatus: "Adopted", vaccinationstatus: "Vaccinated", size: "63 cm", temperament:"Aggressive" },
];

const ShowAllPetsPage = () => {
  const [pets, setPets] = useState(initialPets);
  const [editingPet, setEditingPet] = useState(null);

  const deletePet = (id) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  const savePet = (updatedPet) => {
    if (updatedPet.id) {
      setPets(pets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet)));
    } else {
      setPets([...pets, { ...updatedPet, id: Date.now() }]);
    }
    setEditingPet(null);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "Breed", accessor: "breed" },
    { header: "Adoption Status", accessor: "adoptionstatus" },
    { header: "Vaccination Status", accessor: "vaccinationstatus" },
    { header: "Size", accessor: "size" },
    { header: "Temperament", accessor: "temperament" },
    { header: "Age", accessor: "age" },
    {
      header: "Actions",
      accessor: "actions",
      Cell: (pet) => (
        <>
          <Button
            label="Edit"
            onClick={() => setEditingPet(pet)}
            variant="secondary"
          />
          <Button
            label="Delete"
            onClick={() => deletePet(pet.id)}
            variant="danger"
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.tableHeader}>
          <h2>Pets Management</h2>
          <Button
            label="Add Pet"
            onClick={() => setEditingPet({
              name: "",
              type: "",
              breed: "",
              age: "",
              adoptionstatus: "",
              vaccinationstatus: "",
              size: "",
              temperament: "",
            })}
            variant="primary"
          />
        </div>
        <Table data={pets} columns={columns} />

        {editingPet && (
          <div className={styles.editContainer}>
            <button
              className={styles.closeButton}
              onClick={() => setEditingPet(null)}
            >
              &times;
            </button>
            <h3>{editingPet.id ? "Edit Pet" : "Add Pet"}</h3>
            <Field
              label="Name"
              value={editingPet.name}
              onChange={(e) => setEditingPet({ ...editingPet, name: e.target.value })}
            />
            <Field
              label="Type"
              value={editingPet.type}
              onChange={(e) => setEditingPet({ ...editingPet, type: e.target.value })}
            />
            <Field
              label="Breed"
              value={editingPet.breed}
              onChange={(e) => setEditingPet({ ...editingPet, breed: e.target.value })}
            />
            <Field
              label="Adoption Status"
              value={editingPet.adoptionstatus}
              onChange={(e) =>
                setEditingPet({ ...editingPet, adoptionstatus: e.target.value })
              }
            />
            <Field
              label="Vaccination Status"
              value={editingPet.vaccinationstatus}
              onChange={(e) =>
                setEditingPet({ ...editingPet, vaccinationstatus: e.target.value })
              }
            />
            <Field
              label="Size"
              value={editingPet.size}
              onChange={(e) => setEditingPet({ ...editingPet, size: e.target.value })}
            />
            <Field
              label="Temperament"
              value={editingPet.temperament}
              onChange={(e) =>
                setEditingPet({ ...editingPet, temperament: e.target.value })
              }
            />
            <Field
              label="Age"
              type="number"
              value={editingPet.age}
              onChange={(e) =>
                setEditingPet({ ...editingPet, age: parseInt(e.target.value, 10) })
              }
            />
            <Button
              label="Save"
              onClick={() => savePet(editingPet)}
              variant="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowAllPetsPage;
