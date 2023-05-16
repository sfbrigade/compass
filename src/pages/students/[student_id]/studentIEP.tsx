type Student = {
  //do we need this here?
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  assigned_case_manager_id: string | null;
};
interface StudentIEPProps {
  student: Student | undefined;
}
const StudentIEP: React.FC<StudentIEPProps> = ({ student }) => {
  return (
    <div>
      <h1>
        {student?.first_name} {student?.last_name}&apos;s IEP:
      </h1>
      <ul></ul>
    </div>
  );
};
export default StudentIEP;
