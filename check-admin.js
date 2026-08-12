const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst();
  console.log("Admin email:", admin?.email);
}

main().finally(() => prisma.$disconnect());
