-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" DATETIME,
    CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamRole" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "permissions" TEXT NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TeamRole_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamMemberRole" (
    "teamMemberId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    PRIMARY KEY ("teamMemberId", "roleId"),
    CONSTRAINT "TeamMemberRole_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TeamMemberRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "TeamRole" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TeamCategory_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "authorMemberId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "audienceType" TEXT NOT NULL DEFAULT 'TEAM',
    "requiresCompletion" BOOLEAN NOT NULL DEFAULT false,
    "completionStatus" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Item_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TeamCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_authorMemberId_fkey" FOREIGN KEY ("authorMemberId") REFERENCES "TeamMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemAudience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetMemberId" TEXT,
    "targetRoleId" TEXT,
    CONSTRAINT "ItemAudience_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemAudience_targetMemberId_fkey" FOREIGN KEY ("targetMemberId") REFERENCES "TeamMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ItemAudience_targetRoleId_fkey" FOREIGN KEY ("targetRoleId") REFERENCES "TeamRole" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemRead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "teamMemberId" TEXT NOT NULL,
    "readAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemRead_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemRead_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "TeamMember_teamId_isActive_idx" ON "TeamMember"("teamId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_teamId_userId_key" ON "TeamMember"("teamId", "userId");

-- CreateIndex
CREATE INDEX "TeamRole_teamId_isActive_idx" ON "TeamRole"("teamId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRole_teamId_name_key" ON "TeamRole"("teamId", "name");

-- CreateIndex
CREATE INDEX "TeamMemberRole_roleId_idx" ON "TeamMemberRole"("roleId");

-- CreateIndex
CREATE INDEX "TeamCategory_teamId_isActive_sortOrder_idx" ON "TeamCategory"("teamId", "isActive", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "TeamCategory_teamId_name_key" ON "TeamCategory"("teamId", "name");

-- CreateIndex
CREATE INDEX "Item_teamId_createdAt_idx" ON "Item"("teamId", "createdAt");

-- CreateIndex
CREATE INDEX "Item_teamId_categoryId_createdAt_idx" ON "Item"("teamId", "categoryId", "createdAt");

-- CreateIndex
CREATE INDEX "Item_teamId_isImportant_createdAt_idx" ON "Item"("teamId", "isImportant", "createdAt");

-- CreateIndex
CREATE INDEX "ItemAudience_itemId_idx" ON "ItemAudience"("itemId");

-- CreateIndex
CREATE INDEX "ItemAudience_targetMemberId_idx" ON "ItemAudience"("targetMemberId");

-- CreateIndex
CREATE INDEX "ItemAudience_targetRoleId_idx" ON "ItemAudience"("targetRoleId");

-- CreateIndex
CREATE INDEX "ItemRead_teamMemberId_readAt_idx" ON "ItemRead"("teamMemberId", "readAt");

-- CreateIndex
CREATE UNIQUE INDEX "ItemRead_itemId_teamMemberId_key" ON "ItemRead"("itemId", "teamMemberId");
