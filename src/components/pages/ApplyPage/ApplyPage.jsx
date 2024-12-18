// src/components/pages/ApplyPage/ApplyPage.jsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import VideoBackground from "../../common/Videobackground";
import Field from "../../common/Field";
import Button from "../../common/Button";
import Card from "../../common/Card";
// import Title from "../../common/Title";
import PageTransition from "../../common/PageTransition";
import styles from "./ApplyPage.module.css";

const ApplyPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Organization Information",
      content: (
        <>
          <Field label="Organization Name" required placeholder="Name" />
          <Field label="Organization Type" required placeholder="Type" />
          <Field
            label="Physical Address"
            required
            placeholder="Address"
            textarea
          />
          <Field label="Website" placeholder="Website URL" />
          <Field
            label="Social Media Handles"
            placeholder="Links to social media"
            textarea
          />
        </>
      ),
    },
    {
      title: "Contact Information",
      content: (
        <>
          <Field
            label="Primary Contact Name"
            required
            placeholder="Full Name"
          />
          <Field label="Title/Position" placeholder="Title" />
          <Field
            label="Email Address"
            required
            placeholder="example@domain.com"
          />
          <Field label="Phone Number" placeholder="Phone" />
        </>
      ),
    },
    {
      title: "Verification Documents",
      content: (
        <Field
          label="Proof of Organization"
          type="file"
          placeholder="Upload documents"
        />
      ),
    },
  ];

  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goToPreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <PageTransition currentPage={currentStep}>
      <div className={styles.container}>
        <VideoBackground src="/video.mp4" />
        <Card size="large">
          {/* <Title text={steps[currentStep].title} level={2} /> */}
          <form className={styles.form}>
            <AnimatePresence mode="wait">
              <PageTransition currentPage={currentStep}>
                {steps[currentStep].content}
              </PageTransition>
            </AnimatePresence>
            <div className={styles.navigationButtons}>
              {currentStep > 0 && (
                <Button label="Back" onClick={goToPreviousStep} />
              )}
              {currentStep < steps.length - 1 ? (
                <Button label="Next" onClick={goToNextStep} />
              ) : (
                <Button label="Submit" type="submit" />
              )}
            </div>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
};

export default ApplyPage;
