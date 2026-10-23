CREATE TABLE `stories` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`collection` text NOT NULL,
	`scripture` text DEFAULT '' NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`sections` text DEFAULT '{}' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`pdf_key` text,
	`video_key` text,
	`image_key` text,
	`youtube` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `stories_status_collection` ON `stories` (`status`,`collection`);--> statement-breakpoint
CREATE TABLE `uploads` (
	`key` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` text NOT NULL
);
