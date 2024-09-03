ALTER TABLE "user" DROP CONSTRAINT "user_plan_plan_id_fk";
--> statement-breakpoint
ALTER TABLE "plan" ADD COLUMN "user" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan" ADD CONSTRAINT "plan_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "plan";