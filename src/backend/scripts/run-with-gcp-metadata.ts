import { execa } from "execa";
import * as gcpMetadata from "gcp-metadata";
import axios from "axios";

/**
 * This script injects Google Cloud metadata (when available) into the environment.
 * Specifically, it injects the NEXTAUTH_URL and BASE_HTTP_ENDPOINT environment variables.
 * Run with `npm run with-gcp-metadata <command> <args>`.
 */
const runWithGcpMetadata = async () => {
  const env: NodeJS.ProcessEnv = {
    NODE_ENV: process.env.NODE_ENV,
  };

  const isGcp = await gcpMetadata.isAvailable();
  if (isGcp) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [projectId, regionPath, { access_token }]: [
      string,
      string,
      { access_token: string },
    ] = await Promise.all([
      gcpMetadata.project("project-id"),
      gcpMetadata.instance("region"),
      gcpMetadata.instance("service-accounts/default/token"),
    ]);

    const region = regionPath.split("regions/")[1];

    const getServiceResponse = await axios<{ status: { url: string } }>(
      `https://${region}-run.googleapis.com/apis/serving.knative.dev/v1/namespaces/${projectId}/services/compass`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (process.env.NEXTAUTH_URL && process.env.NEXTAUTH_URL !== "") {
      console.log(
        "🕵️  NEXTAUTH_URL already set, NEXTAUTH_URL and BASE_HTTP_ENDPOINT will not be modified.",
      );
    } else {
      env.NEXTAUTH_URL = getServiceResponse.data.status.url;
      env.BASE_HTTP_ENDPOINT = getServiceResponse.data.status.url;

      console.log(
        "🕵️  running on GCP, environment will be modified with NEXTAUTH_URL and BASE_HTTP_ENDPOINT.",
      );
    }
  } else {
    console.log("🕵️  not running on GCP, environment will not be modified.");
  }

  const splitArgsAt = process.argv.findIndex((arg) =>
    arg.endsWith("run-with-gcp-metadata.ts"),
  );
  const args = process.argv.slice(splitArgsAt + 1);

  await execa(args[0], args.slice(1), {
    preferLocal: true,
    stderr: process.stderr,
    stdout: process.stdout,
    stdin: process.stdin,
    env,
  });
};

void runWithGcpMetadata();
