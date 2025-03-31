import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

const levels = Array.from({ length: 16 }, (_, i) => ({
  id: `level-${i + 1}`, // Unique ID
  name: `Level ${i + 1}`,
  levelNumber: i + 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

async function main() {
  console.log("Seeding levels...");

  for (const level of levels) {
    await db.level.upsert({
      where: { levelNumber: level.levelNumber },
      update: {}, // No updates needed, just prevent duplicates
      create: level,
    });
  }

  console.log("Seeding completed ✅");
}

main()
  .catch((error) => {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });