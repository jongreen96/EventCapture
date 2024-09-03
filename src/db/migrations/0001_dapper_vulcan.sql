CREATE TABLE IF NOT EXISTS "plan" (
	"id" text PRIMARY KEY NOT NULL,
	"plan" text,
	"pricePaid" integer,
	"endDate" timestamp,
	"expired" boolean
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_plan_plan_id_fk" FOREIGN KEY ("plan") REFERENCES "public"."plan"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
