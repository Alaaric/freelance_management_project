-- CreateTable
CREATE TABLE "freelances" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "skills" TEXT[],
    "tjm" INTEGER NOT NULL,

    CONSTRAINT "freelances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entreprises" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "secteur" TEXT NOT NULL,

    CONSTRAINT "entreprises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projets" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillsRequis" TEXT[],
    "budgetMaxTjm" INTEGER NOT NULL,
    "entrepriseId" INTEGER NOT NULL,
    "freelanceId" INTEGER,

    CONSTRAINT "projets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "freelances_email_key" ON "freelances"("email");

-- AddForeignKey
ALTER TABLE "projets" ADD CONSTRAINT "projets_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "entreprises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projets" ADD CONSTRAINT "projets_freelanceId_fkey" FOREIGN KEY ("freelanceId") REFERENCES "freelances"("id") ON DELETE SET NULL ON UPDATE CASCADE;
