import axios from 'axios'
import useSWR from 'swr'

// TODO(amantri): get this from the server code, preferably auto-generated
interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  assigned_case_manager: string;
}

const apiPath = (process.env.NEXT_PUBLIC_SERVER || 'http://localhost:8080') + '/students/list'

export default function Students() {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error, isLoading } = useSWR(apiPath, fetcher)

  if (error) return <div>Failed to load: {error.message}</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <title>Student list</title>

      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}