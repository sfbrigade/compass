// package: compass
// file: compass.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as compass_pb from "./compass_pb";

interface ICompassService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getStudents: ICompassService_IGetStudents;
}

interface ICompassService_IGetStudents
  extends grpc.MethodDefinition<
    compass_pb.GetStudentsRequest,
    compass_pb.GetStudentsResponse
  > {
  path: "/compass.Compass/GetStudents";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<compass_pb.GetStudentsRequest>;
  requestDeserialize: grpc.deserialize<compass_pb.GetStudentsRequest>;
  responseSerialize: grpc.serialize<compass_pb.GetStudentsResponse>;
  responseDeserialize: grpc.deserialize<compass_pb.GetStudentsResponse>;
}

export const CompassService: ICompassService;

export interface ICompassServer extends grpc.UntypedServiceImplementation {
  getStudents: grpc.handleUnaryCall<
    compass_pb.GetStudentsRequest,
    compass_pb.GetStudentsResponse
  >;
}

export interface ICompassClient {
  getStudents(
    request: compass_pb.GetStudentsRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: compass_pb.GetStudentsResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getStudents(
    request: compass_pb.GetStudentsRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: compass_pb.GetStudentsResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getStudents(
    request: compass_pb.GetStudentsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: compass_pb.GetStudentsResponse
    ) => void
  ): grpc.ClientUnaryCall;
}

export class CompassClient extends grpc.Client implements ICompassClient {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: Partial<grpc.ClientOptions>
  );
  public getStudents(
    request: compass_pb.GetStudentsRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: compass_pb.GetStudentsResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getStudents(
    request: compass_pb.GetStudentsRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: compass_pb.GetStudentsResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getStudents(
    request: compass_pb.GetStudentsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: compass_pb.GetStudentsResponse
    ) => void
  ): grpc.ClientUnaryCall;
}
