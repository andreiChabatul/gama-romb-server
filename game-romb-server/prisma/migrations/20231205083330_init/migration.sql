-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "numberGame" INTEGER NOT NULL DEFAULT 0,
    "numberWin" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");
