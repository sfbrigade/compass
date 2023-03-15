import {
  ServerUnaryCall,
  sendUnaryData,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import { logger } from "~/lib";
import { ICompassServer } from "../proto-gen/compass_grpc_pb"; // TODO: share
import {
  GetStudentsRequest,
  GetStudentsResponse,
  Student,
} from "../proto-gen/compass_pb"; // TODO: share

export class CompassServer implements ICompassServer {
  [name: string]: UntypedHandleCall;

  public getStudents(
    call: ServerUnaryCall<GetStudentsRequest, GetStudentsResponse>,
    callback: sendUnaryData<GetStudentsResponse>
  ): void {
    logger.info("getStudents called");
    const resp = new GetStudentsResponse();
    // TODO: make db call and fetch data
    const s = new Student();
    s.setId("id1");
    s.setFirstName("foo");
    s.setLastName("bar");

    resp.addStudent(s);
    callback(null, resp);
  }
}
