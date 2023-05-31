import { requiresAdminAuth } from "@/client/lib/protected-page";
import Link from "next/link";

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Utilities</h1>
      <Link href="/admin/postgres">Postgres info</Link>
    </div>
  );
};

export default requiresAdminAuth(AdminHome);
