import ParaNav from "@/components/ParaNav";
import { useRouter } from "next/router";
import React from "react";

const StudentProfilePage = () => {
  const router = useRouter();
  return (
    <div>
      <ParaNav />
      put student profile page here
    </div>
  );
};

export default StudentProfilePage;
