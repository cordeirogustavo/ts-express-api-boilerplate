import { RunningEnvironment } from "@/@types/environment";

const { providers, cache, queue, storage } = process.settings;

const {
  keyId,
  secretKey,
  s3: { bucket, region, endpoint },
} = process.settings.aws;

export const baseStorageConfig = {
  "aws-s3": {
    providerName: "aws-s3" as const,
    bucket,
    region,
  },
  localtack: {
    providerName: "localstack" as const,
    bucket,
    region,
    endpoint,
    keyId,
    secretKey,
  },
  disk: {
    providerName: "disk" as const,
    temporaryFolder: storage.tmpFolder,
    uploadsFolderName: storage.uploadsFolder,
  },
};
export const storageConfig =
  baseStorageConfig[providers.storage as keyof typeof baseStorageConfig];

export const { queues } = queue;

const baseQueueConfig = {
  rabbitmq: {
    providerName: "rabbitmq" as const,
    ...queue,
  },
  inactive: {
    providerName: "inactive" as const,
    publishReturn: true,
  },
};

export const queueConfig = baseQueueConfig[providers.queue];

const baseCacheConfig = {
  redis: {
    providerName: "redis" as const,
    env: process.settings.app.env as RunningEnvironment,
    appSlug: process.settings.app.slug,
    ...cache,
  },
  inactive: {
    providerName: "inactive" as const,
    env: process.settings.app.env as RunningEnvironment,
    appSlug: process.settings.app.slug,
  },
};

export const cacheConfig = baseCacheConfig[providers.cache];
