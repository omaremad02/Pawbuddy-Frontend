import React, { useState, useEffect, useRef } from "react";
import styles from "./Login.module.css"; // Import the CSS module
import "./styles.css"; // Import shared styles for the video background

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(0); // Track which step the user is on
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Ensures the video reloads properly
    }
  }, []);

  const steps = [
    {
      title: "Organization Information",
      content: (
        <>
          <label htmlFor="organizationName">
            Organization Name <span className={styles.req}>*</span>
          </label>
          <input
            id="organizationName"
            type="text"
            className={styles.input}
            placeholder="Full legal name of the organization"
            required
          />

          <label htmlFor="organizationType">
            Organization Type <span className={styles.req}>*</span>
          </label>
          <input
            id="organizationType"
            type="text"
            className={styles.input}
            placeholder="Shelter, Clinic, Rescue, etc."
            required
          />

          <label htmlFor="physicalAddress">
            Physical Address <span className={styles.req}>*</span>
          </label>
          <textarea
            id="physicalAddress"
            className={styles.input}
            placeholder="Street address, city, state/province, country, ZIP/postal code"
            required
          />

          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            className={styles.input}
            placeholder="Official website URL"
          />

          <label htmlFor="socialMedia">Social Media Handles</label>
          <textarea
            id="socialMedia"
            className={styles.input}
            placeholder="Links to Facebook, Instagram, Twitter, etc."
          />
        </>
      ),
    },
    {
      title: "Contact Information",
      content: (
        <>
          <label htmlFor="primaryContactName">
            Primary Contact Name <span className={styles.req}>*</span>
          </label>
          <input
            id="primaryContactName"
            type="text"
            className={styles.input}
            placeholder="Full name"
            required
          />

          <label htmlFor="titlePosition">Title/Position</label>
          <input
            id="titlePosition"
            type="text"
            className={styles.input}
            placeholder="Title or Position"
          />

          <label htmlFor="emailAddress">
            Email Address <span className={styles.req}>*</span>
          </label>
          <input
            id="emailAddress"
            type="email"
            className={styles.input}
            placeholder="example@domain.com"
            required
          />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            className={styles.input}
            placeholder="Contact phone number"
          />
        </>
      ),
    },
    {
      title: "Verification Documents",
      content: (
        <>
          <label htmlFor="proofOfOrganization">Proof of Organization</label>
          <input
            id="proofOfOrganization"
            type="file"
            className={styles.input}
            multiple
          />
        </>
      ),
    },
  ];

  // Handle "Next" button click
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle "Back" button click
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="container">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="background-clip"
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.card}>
        <h2 className={styles.title}>{steps[currentStep].title}</h2>
        <p className={styles.subtitle}>
          Please fill out the form below to provide details about your
          organization.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formStep}>{steps[currentStep].content}</div>

          <div className={styles.navigationButtons}>
            {currentStep > 0 && (
              <button
                type="button"
                className={styles.button}
                onClick={goToPreviousStep}
              >
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                className={styles.button}
                onClick={goToNextStep}
              >
                Next
              </button>
            ) : (
              <button type="submit" className={styles.button}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
