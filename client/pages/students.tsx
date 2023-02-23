import { useState, useEffect } from 'react'

// TODO(amantri): get this from the server code, preferably auto-generated
interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  assigned_case_manager: string;
}

export default function Students() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // TODO(amantri): Get backend url from env
    fetch('http://localhost:8080/students/list')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

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