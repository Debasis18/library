import { Suspense } from "react";
import Spinner from "@/components/LoadingSpinner";
import UsersRecordTable from "../_components/AllUsers";

function Users() {
  return (
    <div>
      <h1 className="text-2xl mb-4 text-accent-500 font-medium">All Users</h1>
      <Suspense fallback={<Spinner />}>
        <UsersRecordTable />
      </Suspense>
    </div>
  );
}

export default Users;
