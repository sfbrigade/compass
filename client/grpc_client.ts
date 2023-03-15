import { CompassClient } from "./proto-gen/CompassServiceClientPb";

export const grpcClient = new CompassClient("localhost:8080");
