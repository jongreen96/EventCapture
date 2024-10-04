CREATE TABLE IF NOT EXISTS "image" (
	"plan_id" text,
	"guest" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "guest";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image" ADD CONSTRAINT "image_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
