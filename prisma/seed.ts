import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  // Crear Roles (Usamos variables para evitar el error de 'unused-vars')
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER' },
  });

  // 2. Crear Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@turing.com' },
    update: {},
    create: {
      email: 'admin@turing.com',
      name: 'Admin Turing',
      password,
      roleId: adminRole.id, // Aquí usamos el ID del rol creado arriba
    },
  });

  // Crear Proyecto (Categoría)
  const project = await prisma.project.upsert({
    where: { name: 'Laptops' },
    update: {},
    create: {
      name: 'Laptops',
      description: 'Equipos portátiles para desarrollo',
      userId: admin.id,
    },
  });

  // Crear Material (Activo)
  await prisma.material.create({
    data: {
      name: 'MacBook Pro M3',
      status: 'Disponible',
      projectId: project.id,
    },
  });

  console.log(' Seed finalizado con éxito en 3NF');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
