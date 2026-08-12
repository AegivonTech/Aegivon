import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CUSTOM_ROLES = [
  {
    title: "Machine Learning Engineer",
    department: "Core Engineering",
    description: "Our mission relies on intelligent parsing of high-stress scenarios. We need someone who can design algorithms that understand context, urgency, and raw data from multiple sources without faltering.",
    requirements: "Experience with open-source LLMs, NLP, and fine-tuning models."
  },
  {
    title: "Backend Engineer",
    department: "Infrastructure",
    description: "Real-time SOS signals and encrypted messaging require a backend that does not go down. We need robust, low-latency architecture that scales effortlessly.",
    requirements: "Experience with WebSockets, Redis, PostgreSQL, and scalable architecture."
  },
  {
    title: "Security Analyst",
    department: "Cybersecurity",
    description: "We are building a safety platform. If we aren't secure, we are nothing. We need a paranoid mind to find our vulnerabilities before someone else does.",
    requirements: "Experience with penetration testing, auth flows, and encryption protocols."
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    description: "In a panic, users don't have time to navigate complex menus. We need interfaces that are brutally simple, highly accessible, and visually striking.",
    requirements: "Experience designing intuitive flows under extreme stress with a high-tech aesthetic."
  }
];

async function main() {
  for (const role of CUSTOM_ROLES) {
    const existing = await prisma.jobRole.findFirst({
      where: { title: role.title }
    });

    if (!existing) {
      await prisma.jobRole.create({
        data: {
          title: role.title,
          department: role.department,
          description: role.description,
          requirements: role.requirements,
          status: 'OPEN'
        }
      });
      console.log(`Created role: ${role.title}`);
    } else {
      console.log(`Role already exists: ${role.title}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
