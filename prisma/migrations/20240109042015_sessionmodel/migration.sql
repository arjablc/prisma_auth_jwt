/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `refreshToken`,
    DROP COLUMN `sessionToken`;
