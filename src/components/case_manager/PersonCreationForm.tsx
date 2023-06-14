/* This is a functional <form> component to be imported by both the AllStudents.tsx and the AllParas.tsx
NOTE: Subsequent list rendering and trpc calls would be challenging to reuse, but this form element can be used successfully in the front end for users to create or add students or paras to their caseloads, populating both lists. */

import React from "react";
import styles from "../../styles/Dashboard.module.css";

interface Props {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PersonCreationForm = ({ title, onSubmit }: Props) => {
  return (
    <div>
      <div className={styles.createContainer}>
        <h2 className={styles.createTitle}>{title}</h2>
        <form onSubmit={onSubmit} className={styles.createInput}>
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="first.last@email.com"
            required
          />
          <button type="submit" className={styles.createButton}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonCreationForm;
