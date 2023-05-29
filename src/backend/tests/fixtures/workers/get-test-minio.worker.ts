import { GenericContainer } from "testcontainers";
import { SharedWorker } from "ava/plugin";
import { S3Client } from "@aws-sdk/client-s3";
import { CreateBucketCommand } from "@aws-sdk/client-s3";

const startMinio = async () => {
  const container = await new GenericContainer(
    "minio/minio:RELEASE.2023-05-18T00-05-36Z"
  )
    .withExposedPorts(9000)
    .withCommand(["server", "/data"])
    .start();

  const params = {
    endpoint: `http://localhost:${container.getMappedPort(9000)}`,
    accessKey: "minioadmin",
    secretKey: "minioadmin",
    bucket: "compass",
  };

  const s3 = new S3Client({
    endpoint: params.endpoint,
    credentials: {
      accessKeyId: params.accessKey,
      secretAccessKey: params.secretKey,
    },
    forcePathStyle: true,
  });

  const command = new CreateBucketCommand({
    Bucket: params.bucket,
  });
  await s3.send(command);

  return params;
};

export type MinioWorkerPublishedMessage = Awaited<
  ReturnType<typeof startMinio>
>;

const minioPromise = startMinio();

const handleTestWorkers = async (protocol: SharedWorker.Protocol) => {
  for await (const worker of protocol.testWorkers()) {
    worker.publish(await minioPromise);
  }
};

export default handleTestWorkers;
