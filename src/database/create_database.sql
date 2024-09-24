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

END;