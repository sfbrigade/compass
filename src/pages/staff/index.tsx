import React from "react";
import MyParas from "@/components/case_manager/MyParas";
import { requiresAdminAuth } from "@/client/lib/protected-page";

function Staff() {
  return <MyParas />;
}

const protectedStaffList = requiresAdminAuth(Staff);

export default protectedStaffList;
