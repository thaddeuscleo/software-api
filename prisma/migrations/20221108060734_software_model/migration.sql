-- CreateTable
CREATE TABLE "Software" (
    "id" TEXT NOT NULL,
    "softwareName" TEXT NOT NULL,
    "group" TEXT,
    "version" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "currentLicense" TEXT NOT NULL,
    "numberOfLicense" INTEGER NOT NULL,
    "installerPath" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("id")
);
