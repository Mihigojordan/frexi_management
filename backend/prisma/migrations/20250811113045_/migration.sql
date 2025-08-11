-- CreateTable
CREATE TABLE `Destination` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `description` JSON NOT NULL,
    `visaRequirements` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `currencyUsed` VARCHAR(191) NULL,
    `areaKm2` DOUBLE NULL,
    `popularSites` JSON NULL,
    `highlights` JSON NULL,
    `estimatedBudget` DOUBLE NULL,
    `imageUrl` VARCHAR(191) NULL,
    `gallery` JSON NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
