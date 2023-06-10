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
      <h3>Goals section</h3>
      <h3>Subgoals section</h3>
      <ul></ul>
    </div>
  );
};
export default StudentIEP;
