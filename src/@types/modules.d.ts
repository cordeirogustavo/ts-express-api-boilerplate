declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_PORT: string;
      APP_SLUG: string;
      APP_URL: string;
      APP_SECRET: string;
      APP_ENV: "local" | "development" | "production" | "localstack";
      APP_LOG_LEVEL: string;
      AWS_S3_REGION: string;
      AWS_S3_BUCKET_NAME: string;
      AWS_S3_ENDPOINT: string | undefined;
      AWS_ACCESS_KEY_ID: string | undefined;
      AWS_SECRET_KEY: string | undefined;
      DATABASE_PROVIDER: "pgPromise" | "pg";
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_NAME: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      QUEUE_HOST: string;
      QUEUE_VHOST: string;
      QUEUE_USERNAME: string;
      QUEUE_PASSWORD: string;
      QUEUE_SOCKET_TIMEOUT: number;
      PRIORITY_REPORT_QUEUE: string;
      CACHE_HOST: string;
      CACHE_PORT: number;
      CACHE_PASSWORD: string;
      CACHE_TTL: number;
      CACHE_TLS: bool;
      CACHE_DB_INDEX: number;
      STORAGE_PROVIDER: "disk" | "s3";
      SCHEMA_PROVIDER: "zod";
      UPLOAD_PROVIDER: "multer";
      QUEUE_PROVIDER: "inactive" | "rabbitmq";
      CACHE_PROVIDER: "inactive" | "redis";
      MAX_BODY_SIZE: string;
      SERVER_TIMEOUT: number;
      TEMP_FOLDER: string | undefined;
      UPLOADS_FOLDER: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
      EMAIL_PROVIDER: string;
      EMAIL_HOST: string;
      EMAIL_PORT: string;
      EMAIL_SECURE: boolean;
      EMAIL_AUTH_USER: string;
      EMAIL_AUTH_PASS: string;
      EMAIL_SENDER_NAME: string;
      EMAIL_SENDER_EMAIL: string;
    }
    interface Process {
      settings: {
        app: {
          port: number;
          name: string;
          slug: string;
          url: string;
          secret: string;
          env: "local" | "development" | "production" | "localstack";
          logLevel: string;
          maxBodySize: string;
          serverTimeout: number;
        };
        api: {};
        aws: {
          keyId: string | undefined;
          secretKey: string | undefined;
          s3: {
            region: string;
            bucket: string;
            endpoint: string | undefined;
          };
        };
        providers: {
          storage: "disk" | "s3" | "localstack";
          schema: "zod";
          upload: "multer";
          queue: "inactive" | "rabbitmq";
          cache: "inactive" | "redis";
          database: "pgPromise" | "pg";
          email: string;
        };
        database: {
          host: string;
          port: number;
          name: string;
          username: string;
          password: string;
          dataLimit: number;
          idleInTransactionSessionTimeout: number;
          connectionTimeoutMillis: number;
          statementTimeout: number;
          queryTimeout: number;
          ignoreSsl: bool;
        };
        cache: {
          host: string;
          port: number;
          password: string;
          ttl: number;
          tls: bool;
          dbIndex: number;
        };
        queue: {
          host: string;
          vhost: string;
          username: string;
          password: string;
          socketTimeout: number;
          queues: {
            priorityReport: string;
          };
        };
        storage: {
          tmpFolder?: string;
          uploadsFolder: string;
        };
        email: {
          host: string;
          port: number;
          secure: boolean;
          auth: {
            user: string;
            pass: string;
          };
          sender: {
            name: string;
            email: string;
          };
        };
        google: {
          oauth: {
            clientId: string;
            clientSecret: string;
          };
        };
        facebook: {
          oauth: {
            clientId: string;
            clientSecret: string;
          };
        };
      };
    }
  }
}

export {};
