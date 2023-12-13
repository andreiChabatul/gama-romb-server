-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('ru', 'en');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "locale" "Locale" NOT NULL DEFAULT 'ru',
ALTER COLUMN "password" DROP NOT NULL;
