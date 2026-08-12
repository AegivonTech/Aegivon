const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Database State Audit ---");
  const users = await prisma.user.count();
  const roles = await prisma.jobRole.count();
  const applications = await prisma.application.count();
  const enquiries = await prisma.enquiry.count();
  const logs = await prisma.activityLog.count();

  console.log(`Admin Users: ${users}`);
  console.log(`Job Roles: ${roles}`);
  console.log(`Applications: ${applications}`);
  console.log(`Enquiries: ${enquiries}`);
  console.log(`Activity Logs: ${logs}`);

  if (applications > 0) {
    console.log("\nLatest Application:");
    const lastApp = await prisma.application.findFirst({ orderBy: { createdAt: 'desc' }});
    console.log(lastApp);
  }

  if (enquiries > 0) {
    console.log("\nLatest Enquiry:");
    const lastEnq = await prisma.enquiry.findFirst({ orderBy: { createdAt: 'desc' }});
    console.log(lastEnq);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
