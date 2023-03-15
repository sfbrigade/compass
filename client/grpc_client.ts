
import { CompassClient } from "./proto/CompassServiceClientPb";

export const grpcClient = new CompassClient("localhost:8081");