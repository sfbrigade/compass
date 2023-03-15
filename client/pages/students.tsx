import * as grpcWeb from "grpc-web";
import { grpcClient } from "../grpc_client";
import {
  GetStudentsRequest,
  GetStudentsResponse,
} from "../proto-gen/compass_pb";

export default function Students() {
  grpcClient.getStudents(
    new GetStudentsRequest(),
    {},
    (err: grpcWeb.RpcError, resp: GetStudentsResponse) => {
      if (err != null) {
        console.log(err);
      } else {
        console.log(resp);
      }
    }
  );

  // const getStudentsRequest = new GetStudentsRequest();
  // grpc.unary(BookService.GetBook, {
  //   request: getBookRequest,
  //   host: host,
  //   onEnd: res => {
  //     const { status, statusMessage, headers, message, trailers } = res;
  //     console.log("getBook.onEnd.status", status, statusMessage);
  //     console.log("getBook.onEnd.headers", headers);
  //     if (status === grpc.Code.OK && message) {
  //       console.log("getBook.onEnd.message", message.toObject());
  //     }
  //     console.log("getBook.onEnd.trailers", trailers);
  //     queryBooks();
  //   }
  // });

  // call.on('status', (status: grpcWeb.Status) => {
  //   if (status.metadata) {
  //     console.log('Received metadata');
  //     console.log(status.metadata);
  //   }
  // });

  // grpc.invoke(grpcClient.getStudents(new GetStudentsRequest(), null, (err: grpcWeb.RpcError, resp: GetStudentsResponse) => {
  //   if (err != null) {
  //     console.log(err);
  //   } else {
  //     console.log(resp);
  //   }
  // }));

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
