interface StudentIEPProps {
  first_name: string | undefined;
  last_name: string | undefined;
}

// TODO: Move this to the components directory
const StudentIEP: React.FC<StudentIEPProps> = ({ first_name, last_name }) => {
  return (
    <div>
      <h1>
        {first_name} {last_name}&apos;s IEP:
      </h1>
      <ul></ul>
    </div>
  );
};
export default StudentIEP;
