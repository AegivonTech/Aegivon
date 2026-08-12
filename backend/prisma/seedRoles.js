const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.jobRole.createMany({
    data: [
      { title: 'Backend Engineer (Node/Rust)', department: 'Engineering', description: 'Founding Team / Equity', requirements: 'Node.js, Rust', status: 'OPEN' },
      { title: 'Mobile App Developer (React Native)', department: 'Engineering', description: 'Early Intern', requirements: 'React Native', status: 'OPEN' },
      { title: 'UI/UX Designer', department: 'Design', description: 'Founding Team / Equity', requirements: 'Figma, UI/UX', status: 'OPEN' }
    ]
  });
  console.log("Seeded roles");
}

main().catch(console.error).finally(() => prisma.$disconnect());
