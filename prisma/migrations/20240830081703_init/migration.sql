-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Step 1: Add the password column as optional (nullable)
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- Step 2: Set a default value for existing rows to ensure no NULL values
-- Replace 'temporary_password' with a secure or meaningful placeholder if needed
UPDATE "User" SET "password" = 'temporary_password' WHERE "password" IS NULL;

-- Step 3: Make the password column required (NOT NULL)
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
