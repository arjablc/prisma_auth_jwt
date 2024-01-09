-- AlterTable
ALTER TABLE `user` MODIFY `sessionToken` VARCHAR(191) NULL,
    MODIFY `refreshToken` VARCHAR(191) NULL;
