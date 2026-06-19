CREATE TABLE "oc_draft" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oc_draft_version" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"draft_id" text NOT NULL,
	"label" text NOT NULL,
	"content" text NOT NULL,
	"version_number" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oc_project" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"source" varchar(32) DEFAULT 'guest_scene' NOT NULL,
	"status" varchar(32) DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oc_project_memory" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"oc_profile" text NOT NULL,
	"relationship_dynamic" text NOT NULL,
	"story_context" text NOT NULL,
	"preferences_boundaries" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "oc_project_memory_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
ALTER TABLE "oc_draft" ADD CONSTRAINT "oc_draft_project_id_oc_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."oc_project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oc_draft_version" ADD CONSTRAINT "oc_draft_version_project_id_oc_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."oc_project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oc_draft_version" ADD CONSTRAINT "oc_draft_version_draft_id_oc_draft_id_fk" FOREIGN KEY ("draft_id") REFERENCES "public"."oc_draft"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oc_project" ADD CONSTRAINT "oc_project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oc_project_memory" ADD CONSTRAINT "oc_project_memory_project_id_oc_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."oc_project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "oc_draft_project_idx" ON "oc_draft" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "oc_draft_version_project_idx" ON "oc_draft_version" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "oc_project_user_idx" ON "oc_project" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "oc_project_memory_project_idx" ON "oc_project_memory" USING btree ("project_id");