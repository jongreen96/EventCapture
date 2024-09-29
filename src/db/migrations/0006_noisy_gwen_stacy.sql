ALTER TABLE "plan" ADD COLUMN "pauseUploads" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "plan" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "plan" ADD COLUMN "pin" text;--> statement-breakpoint
ALTER TABLE "plan" ADD CONSTRAINT "plan_url_unique" UNIQUE("url");