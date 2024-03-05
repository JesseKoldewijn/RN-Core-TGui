CREATE TABLE `configuration` (
	`id` integer PRIMARY KEY NOT NULL,
	`key` text(255) NOT NULL,
	`value` text(1000) NOT NULL,
	`created_at` text,
	`last_updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `configuration_key_unique` ON `configuration` (`key`);