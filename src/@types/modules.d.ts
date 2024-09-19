declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_PORT: string;
      APP_SLUG: string;
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
      MZ_CORE_API_URL: string;
      TEMP_FOLDER: string | undefined;
      UPLOADS_FOLDER: string;
    }
    interface Process {
      settings: {
        app: {
          port: number;
          name: string;
          slug: string;
          env: "local" | "development" | "production" | "localstack";
          logLevel: string;
          maxBodySize: string;
          serverTimeout: number;
        };
        api: {};
        mziq: {
          url: string;
        };
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
      };
    }
  }
}

export {};
