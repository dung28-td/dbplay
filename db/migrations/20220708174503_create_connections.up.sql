CREATE TABLE "connections" (
  "id" INTEGER NOT NULL,
  "name" VARCHAR,
  "dsn" VARCHAR NOT NULL, PRIMARY KEY ("id"), UNIQUE ("dsn")
)