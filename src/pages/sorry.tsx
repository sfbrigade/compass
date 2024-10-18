import React from "react";
import $box from "@/styles/Box.module.css";
import $typo from "@/styles/Typography.module.css";

const SorryPage: React.FC = () => {
  return (
    <div className={$box.default}>
      <h1 className={$typo.bold}>Access Denied</h1>
      <p>Your account is not authorized to use this app.</p>
    </div>
  );
};

export default SorryPage;
