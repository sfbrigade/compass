import { useState } from "react";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import $home from "@/styles/Home.module.css";
import $button from "@/styles/Button.module.css";
import $input from "@/styles/Input.module.css";
import Iep from "../../components/Iep";

// this page is where the action will be
// component for Goals, for Benchmarks, Progress, and Staff
// Each component can be done by an individual to break it up into parts
// add getDetailQuery in this page?

const ViewStudentPage = () => {
  const [archivePrompt, setArchivePrompt] = useState(false);
  const [createIepModal, setCreateIepModal] = useState(false);
  const utils = trpc.useContext();
  const router = useRouter();
  const { student_id } = router.query;

  const { data: student, isLoading } = trpc.student.getStudentById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  // const { data: detailedStudent, isLoading: isLoadingDetail }
  const studentQuery = trpc.student.getStudentDetailById.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id) }
  );

  // const { data: ieps } = trpc.student.getIeps.useQuery(
  //   { student_id: student_id as string },
  //   { enabled: Boolean(student_id) }
  // );

  const archiveMutation = trpc.case_manager.removeStudent.useMutation();
  const handleArchiveStudent = async () => {
    if (!student) {
      return;
    }
    await archiveMutation.mutateAsync({ student_id: student.student_id });
    await router.push(`/students`);
  };

  const iepMutation = trpc.student.addIep.useMutation({
    onSuccess: () => utils.student.getIeps.invalidate(),
  });

  const handleIepSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!student) {
      return; // TODO: improve error handling
    }
    iepMutation.mutate({
      student_id: student.student_id,
      start_date: new Date(data.get("start_date") as string),
      end_date: new Date(data.get("end_date") as string),
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {student?.first_name} {student?.last_name}
      </h1>
      <p>
        <b>Student ID:</b> {student?.student_id}
      </p>
      <p>
        <b>Student Email:</b> {student?.email}
      </p>
      {activeIep && (
        <p>
          <b>IEP End Date:</b>{" "}
          {new Date(activeIep.end_date ?? "").toLocaleDateString()}
        </p>
      )}
      <button
        className={`${$button.default} ${$home.bold}`}
        onClick={() => setArchivePrompt(true)}
      >
        Archive Student
      </button>

      {archivePrompt ? (
        <div>
          <p>
            Are you sure you want to archive {student?.first_name}&nbsp;
            {student?.last_name}?
          </p>
          <button
            className={`${$button.default} ${$home.bold}`}
            onClick={() => handleArchiveStudent()}
          >
            Yes
          </button>
          <button
            className={`${$button.default} ${$home.bold}`}
            onClick={() => setArchivePrompt(false)}
          >
            No
          </button>
        </div>
      ) : null}

      {/*//? If no active IEP, prompt cm to create one  */}
      {!activeIep?.is_active ? (
        <>
          <h3>This student does not have an active IEP. Please create one.</h3>
          <button
            onClick={() => setCreateIepModal(true)}
            className={$button.default}
          >
            Create IEP
          </button>
          {createIepModal && (
            <>
              <div>Create IEP:</div>
              <div>
                <form onSubmit={handleIepSubmit} className={$input.default}>
                  <input
                    type="date"
                    name="start_date"
                    placeholder="IEP start date"
                    required
                  />
                  <input
                    type="date"
                    name="end_date"
                    placeholder="IEP end date"
                    required
                  />
                  <button type="submit" className={$button.default}>
                    Create IEP
                  </button>
                  <button
                    onClick={() => setCreateIepModal(false)}
                    className={$button.default}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <p>IEP ID: {activeIep.iep_id}</p>- Start Date:{" "}
          {new Date(activeIep.start_date ?? "").toLocaleDateString()} <br />-
          End Date: {new Date(activeIep.end_date ?? "").toLocaleDateString()}{" "}
          <br />- CM: {activeIep.case_manager_id} <br />
          <br />
          <Iep iep_id={activeIep.iep_id} />
        </div>
      )}

      <br />
      {/* <ul>
        {ieps?.map((iep) => (
          <li key={iep.iep_id}>
            <Link href={`/iep/${iep.iep_id}`}>IEP</Link>
            <p>IEP ID: {iep.iep_id}</p>- Start Date:{" "}
            {new Date(iep.start_date ?? "").toLocaleDateString()} <br />- End
            Date: {new Date(iep.end_date ?? "").toLocaleDateString()} <br />-
            CM: {iep.case_manager_id} <br />
            <br />
          </li>
        ))}
      </ul> */}
      <div>
        <Link href={`/students`}>Return to Student List</Link>
      </div>

      {/* Simply writing the detailed studentQuery to the div */}
      <div>
        <h1>Detail</h1>
        {JSON.stringify(studentQuery.data)}
      </div>
    </div>
  );
};

export default ViewStudentPage;
