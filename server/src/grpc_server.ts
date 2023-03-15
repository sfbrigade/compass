import {
  ServerUnaryCall,
  sendUnaryData,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import { ICompassServer } from "../proto/compass_grpc_pb"; // TODO: share
import { GetStudentsRequest, GetStudentsResponse, Student } from "../proto/compass_pb"; // TODO: share

export class CompassServer implements ICompassServer {
  [name: string]: UntypedHandleCall;

  public getStudents(
    call: ServerUnaryCall<GetStudentsRequest, GetStudentsResponse>,
    callback: sendUnaryData<GetStudentsResponse>
  ): void {
    const resp = new GetStudentsResponse();
    // TODO: make db call and fetch data
    const s = new Student();
    s.setId("id1");
    s.setFirstName("foo");
    s.setLastName("bar");

    resp.addStudent(s);
    callback(null, resp);
  }
};
