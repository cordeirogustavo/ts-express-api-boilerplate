CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE public."UserStatus" AS ENUM
    ('ACTIVE', 'DEACTIVATED', 'PENDING');

ALTER TYPE public."UserStatus"
    OWNER TO postgres;

CREATE TYPE public."MfaType" AS ENUM
    ('EMAIL', 'APP');

ALTER TYPE public."MfaType"
    OWNER TO postgres;

BEGIN;

CREATE TABLE IF NOT EXISTS public.product
(
    "productId" uuid NOT NULL DEFAULT uuid_generate_v4(),
    description character varying(150) NOT NULL,
    "eanCode" character varying(12),
    price numeric(10, 2) NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT NOW(),
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    CONSTRAINT "PK_productId" PRIMARY KEY ("productId")
);

CREATE TABLE IF NOT EXISTS public."user"
(
    "userId" uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(150) NOT NULL,
    email character varying(150),
    password character varying(200),
    status "UserStatus",
    provider character varying(50) DEFAULT 'TsAPI',
    "providerIdentifier" character varying(100),
    "mfaEnabled" integer DEFAULT 0,
    "mfaKey" json,
    "mfaMethod" "MfaType",
    "mfaEabledAt" timestamp without time zone,
    "userPicture" character varying(1024),
    "createdAt" timestamp without time zone NOT NULL DEFAULT NOW(),
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    CONSTRAINT "PK_user_userId" PRIMARY KEY ("userId")
);

END;