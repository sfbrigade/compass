export interface Env {
  DATABASE_URL: string;
  S3_USER_UPLOADS_ENDPOINT: string;
  S3_USER_UPLOADS_REGION: string;
  S3_USER_UPLOADS_ACCESS_KEY_ID: string;
  S3_USER_UPLOADS_SECRET_ACCESS_KEY: string;
  S3_USER_UPLOADS_BUCKET_NAME: string;
  EMAIL: string;
  EMAIL_PASS: string;
}
