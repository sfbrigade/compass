import { CompassClient } from "./proto-gen/CompassServiceClientPb";

export const grpcClient = new CompassClient("http://localhost:8080");
