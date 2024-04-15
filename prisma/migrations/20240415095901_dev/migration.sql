-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);
