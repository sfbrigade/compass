// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var compass_pb = require('./compass_pb.js');

function serialize_compass_GetStudentsRequest(arg) {
  if (!(arg instanceof compass_pb.GetStudentsRequest)) {
    throw new Error('Expected argument of type compass.GetStudentsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_compass_GetStudentsRequest(buffer_arg) {
  return compass_pb.GetStudentsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_compass_GetStudentsResponse(arg) {
  if (!(arg instanceof compass_pb.GetStudentsResponse)) {
    throw new Error('Expected argument of type compass.GetStudentsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_compass_GetStudentsResponse(buffer_arg) {
  return compass_pb.GetStudentsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CompassService = exports.CompassService = {
  getStudents: {
    path: '/compass.Compass/GetStudents',
    requestStream: false,
    responseStream: false,
    requestType: compass_pb.GetStudentsRequest,
    responseType: compass_pb.GetStudentsResponse,
    requestSerialize: serialize_compass_GetStudentsRequest,
    requestDeserialize: deserialize_compass_GetStudentsRequest,
    responseSerialize: serialize_compass_GetStudentsResponse,
    responseDeserialize: deserialize_compass_GetStudentsResponse,
  },
};

exports.CompassClient = grpc.makeGenericClientConstructor(CompassService);
