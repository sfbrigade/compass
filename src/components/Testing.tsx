import React from "react";
import styles from "../styles/Dashboard.module.css";

//this defines the types on the inputs
export type InputProps = {
  first_name?: string;
  last_name?: string;
  email?: string;
  title?: string;
};
//this handles submit, aside from the trpc mutations, which are endpoint-specific/not easily reusable. This returns the form data for trpc mutation
export function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  return data;
}

export function Input() {
  return (
    <div className={styles.createContainer}>
      <h2 className={styles.createTitle}>Create a Para</h2>

      <form onSubmit={handleSubmit} className={styles.createInput}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          required
        />
        <input type="text" name="last_name" placeholder="Last name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit" className={styles.createButton}>
          Create
        </button>
      </form>
    </div>
  );
}
