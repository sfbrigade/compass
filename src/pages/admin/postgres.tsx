import { requiresAdminAuth } from "@/client/lib/protected-page";
import { trpc } from "@/client/lib/trpc";
import Link from "next/link";

const AdminPostgresInfo = () => {
  const { data: postgresInfo } = trpc.admin.getPostgresInfo.useQuery();

  return (
    <div>
      <Link href="/admin">Admin Home</Link>

      <h1>Postgres info</h1>
      <pre>{postgresInfo}</pre>
    </div>
  );
};

export default requiresAdminAuth(AdminPostgresInfo);
