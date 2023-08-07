import React from "react";
import { requiresAdminAuth } from "@/client/lib/protected-page";

const Settings = () => {
  return (
    <div>
      <p>🚧 Under Construction! 🚧</p>
    </div>
  );
};

const protectedSettings = requiresAdminAuth(Settings);

export default protectedSettings;
