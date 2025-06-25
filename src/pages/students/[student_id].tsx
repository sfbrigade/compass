import { trpc } from "@/client/lib/trpc";
import { Box, Container, Modal, Stack } from "@mui/material";
import { addYears, format, parseISO, subDays } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Iep from "../../components/iep/Iep";
import noGoals from "../../public/img/no-goals-icon.png";
import Image from "next/image";
import $Image from "../../styles/Image.module.css";
import $CompassModal from "../../components/design_system/modal/CompassModal.module.css";
import $StudentPage from "../../styles/StudentPage.module.css";
import { EditStudentModal } from "@/components/student/EditStudentModal";

import type { NextPageWithBreadcrumbs } from "@/pages/_app";
import type { Breadcrumb } from "@/components/design_system/breadcrumbs/Breadcrumbs";
import { useBreadcrumbsContext } from "@/components/design_system/breadcrumbs/BreadcrumbsContext";
import Button from "@/components/design_system/button/Button";

import * as React from "react";
import type { Student } from "@/types/global";

const ViewStudentPage: NextPageWithBreadcrumbs = () => {
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createIepModal, setCreateIepModal] = useState(false);
  const [archivePrompt, setArchivePrompt] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const utils = trpc.useContext();
  const router = useRouter();
  const { student_id } = router.query;

  const handleEditState = () => {
    handleOpen();

    if (activeIep) {
      // * Populates the Edit form with iep startDate and endDate
      setStartDate(activeIep.start_date.toISOString().slice(0, 10));
      setEndDate(activeIep.end_date.toISOString().slice(0, 10));
    }
  };

  const handleMainState = () => {
    handleClose();
  };

  const { data: student, isLoading } = trpc.student.getStudentById.useQuery(
    { student_id: student_id as string },
    {
      enabled: Boolean(student_id),
      retry: false,
      onError: () => returnToStudentList(),
    }
  );

  useEffect(() => {
    if (student) {
      const breadcrumbs = ViewStudentPage.getBreadcrumbs?.({ student });
      setBreadcrumbs(breadcrumbs);
    }
  }, [student, setBreadcrumbs]);

  const returnToStudentList = async () => {
    await router.push(`/students`);
  };

  const { data: activeIep } = trpc.student.getActiveStudentIep.useQuery(
    { student_id: student_id as string },
    { enabled: Boolean(student_id), retry: false }
  );

  const editMutation = trpc.case_manager.editStudent.useMutation({
    onSuccess: () => utils.student.getStudentById.invalidate(),
  });

  const editIepMutation = trpc.student.editIep.useMutation({
    onSuccess: () => utils.student.getActiveStudentIep.invalidate(),
  });

  const handleEditStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);

    if (!student) {
      return; // TODO: improve error handling
    }

    editMutation.mutate({
      student_id: student.student_id,
      first_name: data.get("firstName") as string,
      last_name: data.get("lastName") as string,
      email: (data.get("email") as string) || null,
      grade: Number(data.get("grade")) || 0,
    });

    if (activeIep) {
      editIepMutation.mutate({
        student_id: student.student_id,
        start_date: new Date(parseISO(data.get("start_date") as string)),
        end_date: new Date(parseISO(data.get("end_date") as string)),
      });
    }

    handleMainState();
  };

  const archiveMutation = trpc.case_manager.removeStudent.useMutation();

  const handleArchiveStudent = async () => {
    if (!student) {
      return;
    }
    await archiveMutation.mutateAsync({ student_id: student.student_id });
    await returnToStudentList();
  };

  const iepMutation = trpc.student.addIep.useMutation({
    onSuccess: () => utils.student.getActiveStudentIep.invalidate(),
  });

  const handleAutofillIepEndDate = (date: string) => {
    //new IEP generally starts on same date annually, so end date autofills to the day before one year from start date
    setStartDate(date);
    const parsedDate: Date = parseISO(date);
    const datePlusOneYear: Date = addYears(parsedDate, 1);
    const finalDate: Date = subDays(datePlusOneYear, 1);
    const formattedEndDate: string = format(finalDate, "yyyy-MM-dd");
    setEndDate(formattedEndDate);
  };

  const handleIepSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!student) {
      return; // TODO: improve error handling
    }

    iepMutation.mutate({
      student_id: student.student_id,
      start_date: new Date(parseISO(data.get("start_date") as string)),
      end_date: new Date(parseISO(data.get("end_date") as string)),
    });

    setCreateIepModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!student) return;

  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div>
        <EditStudentModal
          open={open}
          handleClose={handleClose}
          student={student}
          activeIep={activeIep}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          onSubmit={handleEditStudent}
        />
      </div>
      <Container
        className={$StudentPage.studentInfoContainer}
        sx={{ marginBottom: "1rem" }}
      >
        <Box className={$StudentPage.displayBox}>
          <p className={$StudentPage.studentName}>
            {student?.first_name} {student?.last_name}
          </p>

          <Box className={$StudentPage.displayBoxGap}>
            <Button variant="tertiary" onClick={() => setArchivePrompt(true)}>
              Archive
            </Button>
            <Button variant="secondary" onClick={handleEditState}>
              Edit
            </Button>
          </Box>
        </Box>

        <Box className={$StudentPage.displayBox}>
          <Box gap={10} className={$StudentPage.infoBox}>
            <div className={$StudentPage.singleInfoArea}>
              <p>Grade</p>
              <p className={$StudentPage.centerText}>{student?.grade}</p>
            </div>
            <div className={$StudentPage.singleInfoArea}>
              <p>IEP Start Date</p>
              <p className={$StudentPage.centerText}>
                {activeIep?.start_date.toLocaleDateString() ?? "None"}
              </p>
            </div>
            <div className={$StudentPage.singleInfoArea}>
              <p>IEP End Date</p>
              <p className={$StudentPage.centerText}>
                {activeIep?.end_date.toLocaleDateString() ?? "None"}
              </p>
            </div>
          </Box>
        </Box>

        {!activeIep ? (
          <Container className={$StudentPage.noIepContainer}>
            <Box className={$StudentPage.noIepBox}>
              <Image
                src={noGoals}
                alt="no IEP image"
                className={$Image.fitContent}
                priority={true}
              />
              <p className={$StudentPage.textSpacing}>
                This student does not have an active IEP. Please create one.
              </p>
              <Button onClick={() => setCreateIepModal(true)}>
                Create IEP
              </Button>
            </Box>
          </Container>
        ) : (
          // Active IEP is in db
          <Iep iep_id={activeIep.iep_id} />
        )}
      </Container>

      {/* Archiving Student Modal appears when "Archive" button is pressed*/}
      <Modal
        open={archivePrompt}
        onClose={() => setArchivePrompt(false)}
        aria-labelledby="archiving-student"
        aria-describedby="archiving-current-student"
      >
        <Box className={$CompassModal.modalContent}>
          <p className={$StudentPage.centerText}>
            Are you sure you want to archive
          </p>
          <p className={$StudentPage.centerText}>
            <b>
              {student?.first_name} {student?.last_name}
            </b>
          </p>
          <Box className={$StudentPage.archiveOptions}>
            <Button onClick={() => handleArchiveStudent()}>Yes</Button>
            <Button onClick={() => setArchivePrompt(false)}>No</Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Creating IEP */}
      <Modal
        open={createIepModal}
        onClose={() => setCreateIepModal(false)}
        aria-labelledby="create-student-iep"
        aria-describedby="modal for creating student iep"
      >
        <Box className={$CompassModal.modalContent}>
          <p className={$StudentPage.centerText}>Create an IEP for</p>
          <p className={$StudentPage.centerText}>
            <b>
              {student?.first_name} {student?.last_name}
            </b>
          </p>
          <form onSubmit={handleIepSubmit}>
            <div>
              <Box className={$StudentPage.displayBox}>
                <p className={$StudentPage.textLarge}>Start Date:</p>
                <input
                  type="date"
                  name="start_date"
                  placeholder="IEP start date"
                  value={startDate}
                  onChange={(e) => {
                    handleAutofillIepEndDate(e.target.value);
                  }}
                  required
                />
              </Box>
              <Box className={$StudentPage.displayBox}>
                <p className={$StudentPage.textLarge}>End Date:</p>
                <input
                  type="date"
                  name="end_date"
                  placeholder="IEP end date"
                  value={endDate}
                  required
                />
              </Box>

              <Box className={$StudentPage.displayBox}>
                <Button type="submit">Create IEP</Button>
                <Button onClick={() => setCreateIepModal(false)}>Cancel</Button>
              </Box>
            </div>
          </form>
        </Box>
      </Modal>
    </Stack>
  );
};

interface GetBreadcrumbsProps {
  student?: Student;
  isLinked?: boolean;
}

ViewStudentPage.getBreadcrumbs = function getBreadcrumbs({
  student,
  isLinked,
}: GetBreadcrumbsProps = {}) {
  const breadcrumbs: Breadcrumb[] = [
    { href: "/students", children: "Students" },
  ];
  if (student) {
    breadcrumbs.push({
      href: isLinked ? `/students/${student.student_id}` : undefined,
      children: `${student.first_name} ${student.last_name}`,
    });
  }
  return breadcrumbs;
};

export default ViewStudentPage;
