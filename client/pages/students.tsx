import * as grpcWeb from "grpc-web";
import { grpcClient } from "../grpc_client";
import { GetStudentsRequest, GetStudentsResponse } from "../proto/compass_pb";

export default function Students() {
  grpcClient.getStudents(new GetStudentsRequest(), null, (err: grpcWeb.RpcError, resp: GetStudentsResponse) => {
    if (err != null) {
      console.log(err);
    } else {
      console.log(resp);
    }
  });

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
            {/* {data.students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}