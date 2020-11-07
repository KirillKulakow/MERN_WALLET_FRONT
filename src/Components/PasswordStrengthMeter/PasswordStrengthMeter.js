import React from "react";
import styles from "./PasswordStrengthMeter.module.css";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }) => {
  const testedResult = zxcvbn(password);
  const createPasswordLabel = result => {
    switch (result.score) {
      case 0:
        return styles.strength_Weak;
      case 1:
        return styles.strength_Weak;
      case 2:
        return styles.strength_Fair;
      case 3:
        return styles.strength_Good;
      case 4:
        return styles.strength_Strong;
      default:
        return styles.strength_Weak;
    }
  };

  return (
    <div className={styles.password_strength_meter}>
      <progress
        className={`${
          styles.password_strength_meter_progress
        } ${createPasswordLabel(testedResult)}`}
        value={testedResult.score}
        max="4"
      />
    </div>
  );
};

export default PasswordStrengthMeter;
  