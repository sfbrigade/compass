export interface Env {
  BASE_URL: string;
  DATABASE_URL: string;
  S3_USER_UPLOADS_ENDPOINT: string;
  S3_USER_UPLOADS_REGION: string;
  S3_USER_UPLOADS_ACCESS_KEY_ID: string;
  S3_USER_UPLOADS_SECRET_ACCESS_KEY: string;
  S3_USER_UPLOADS_BUCKET_NAME: string;
  SES_ACCESS_KEY_ID: string;
  SES_SECRET_ACCESS_KEY: string;
  SES_REGION: string;
  EMAIL_SERVICE: string;
  EMAIL_AUTH_USER: string;
  EMAIL_AUTH_PASS: string;
  EMAIL_FROM: string;
  EMAIL_HOST: string;
  EMAIL_PORT: string;
}
