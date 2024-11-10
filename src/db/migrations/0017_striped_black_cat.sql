CREATE TABLE IF NOT EXISTS "download" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"url" text NOT NULL,
	"expires" timestamp NOT NULL
);
