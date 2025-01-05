/*
  Warnings:

  - You are about to drop the column `chapter` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `draft` ADD COLUMN `title` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `page` DROP COLUMN `chapter`,
    DROP COLUMN `title`,
    MODIFY `content` TEXT NULL;
