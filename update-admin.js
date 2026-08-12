const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const currentEmail = 'admin@aegivon.com'; // Change this if you already changed the email

  const newEmail = 'CEO@aegivon.com'; // <--- PUT YOUR NEW EMAIL HERE
  const newPassword = 'Betu@1310'; // <--- PUT YOUR NEW PASSWORD HERE

  // Hash the new password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Update the user
  try {
    const updatedUser = await prisma.user.update({
      where: { email: currentEmail },
      data: {
        email: newEmail,
        passwordHash: passwordHash,
      },
    });

    console.log('✅ Admin credentials updated successfully!');
    console.log(`New Email: ${updatedUser.email}`);
    console.log(`New Password: ${newPassword}`);
  } catch (error) {
    console.error('❌ Failed to update credentials. Make sure the current email is correct.');
    console.error(error.message);
  }
}

main().finally(() => prisma.$disconnect());
