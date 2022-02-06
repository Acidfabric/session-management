/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - Added the required column `idToken` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initVector` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Session_accessToken_key` ON `Session`;

-- DropIndex
DROP INDEX `Session_refreshToken_key` ON `Session`;

-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `idToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `initVector` VARCHAR(200) NOT NULL,
    MODIFY `sessionId` VARCHAR(200) NOT NULL,
    ADD PRIMARY KEY (`sessionId`);
