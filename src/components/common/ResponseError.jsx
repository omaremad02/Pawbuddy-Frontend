// ResponseError.js
import styles from "./ResponseError.module.css";
import TextComponent from './TextComponnet.jsx'
const ResponseError = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <div className={styles.errorContainer}>
          <TextComponent color="Red" size="36px" weight="bold" align="center">
            Pet Not Found
          </TextComponent>
          <TextComponent color="Gray" size="18px" align="center">
            The pet details could not be found. Please check the pet ID.
          </TextComponent>
        </div>
      </div>
    </div>
  );
};

export default ResponseError;
