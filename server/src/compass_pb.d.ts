// package: compass
// file: compass.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Student extends jspb.Message {
  getId(): string;
  setId(value: string): Student;
  getFirstName(): string;
  setFirstName(value: string): Student;
  getLastName(): string;
  setLastName(value: string): Student;
  getEmail(): string;
  setEmail(value: string): Student;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Student.AsObject;
  static toObject(includeInstance: boolean, msg: Student): Student.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Student,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Student;
  static deserializeBinaryFromReader(
    message: Student,
    reader: jspb.BinaryReader
  ): Student;
}

export namespace Student {
  export type AsObject = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export class GetStudentsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStudentsRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetStudentsRequest
  ): GetStudentsRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetStudentsRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetStudentsRequest;
  static deserializeBinaryFromReader(
    message: GetStudentsRequest,
    reader: jspb.BinaryReader
  ): GetStudentsRequest;
}

export namespace GetStudentsRequest {
  export type AsObject = {};
}

export class GetStudentsResponse extends jspb.Message {
  clearStudentList(): void;
  getStudentList(): Array<Student>;
  setStudentList(value: Array<Student>): GetStudentsResponse;
  addStudent(value?: Student, index?: number): Student;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStudentsResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetStudentsResponse
  ): GetStudentsResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetStudentsResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetStudentsResponse;
  static deserializeBinaryFromReader(
    message: GetStudentsResponse,
    reader: jspb.BinaryReader
  ): GetStudentsResponse;
}

export namespace GetStudentsResponse {
  export type AsObject = {
    studentList: Array<Student.AsObject>;
  };
}
