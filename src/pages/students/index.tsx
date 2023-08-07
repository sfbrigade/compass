import React from "react";
import MyStudents from "../../components/case_manager/MyStudents";
import styles from "../../styles/Dashboard.module.css";
import { requiresAdminAuth } from "@/client/lib/protected-page";

function Students() {
  return <MyStudents />;
}

const protectedStudentList = requiresAdminAuth(Students);

export default protectedStudentList;
