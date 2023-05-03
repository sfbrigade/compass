import Link from "next/link";
import React from "react";
import styles from "../../styles/Dashboard.module.css";

interface Props {
  title: string;
  endpoint: string;
  listTitle: string;
  //I need a little assistance/time to learn this typescript for "typing an array of objects and a function
  // // eslint-disable-next-line
  // handleSubmit: any,
  // // eslint-disable-next-line
  // entities: any
}

const StudentParaForm = ({ title, endpoint, listTitle }: Props) => {
  //check need to reinsert handle submit into form and props
  return (
    <div>
      <div className={styles.createContainer}>
        <h2 className={styles.createTitle}>{title}</h2>

        <form className={styles.createInput}>
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
          <input type="email" name="email" placeholder="Email" required />
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </form>
      </div>

      <h2>{listTitle}</h2>
      {/* <ul className={styles.listNames}>
        {entities?.map((entity) => (
          <li key={entity.user_id}>
            <Link href={`${endpoint}${entity.user_id}`}>
              {entity.first_name} {entity.last_name}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default StudentParaForm;
