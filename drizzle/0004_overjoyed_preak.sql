CREATE TABLE `concept` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`order` integer NOT NULL,
	`topic_id` text NOT NULL,
	FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `topic` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`order` integer NOT NULL,
	`roadmap_id` text NOT NULL,
	FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `roadmap` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`prompt` text NOT NULL,
	`title` text,
	`description` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `resource` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`concept_id` text NOT NULL,
	FOREIGN KEY (`concept_id`) REFERENCES `concept`(`id`) ON UPDATE no action ON DELETE no action
);
