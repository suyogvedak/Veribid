-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "totalWins" INTEGER NOT NULL DEFAULT 0;
