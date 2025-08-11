/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `destination` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `destination` DROP COLUMN `imageUrl`,
    ADD COLUMN `mainPhotoUrl` VARCHAR(191) NULL;
