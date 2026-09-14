CREATE TABLE "Tasks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Tasks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;