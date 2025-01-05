-- DropForeignKey
ALTER TABLE `page` DROP FOREIGN KEY `Page_draftId_fkey`;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_draftId_fkey` FOREIGN KEY (`draftId`) REFERENCES `Draft`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
