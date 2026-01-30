import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  // Crear Usuarios
  const admin = await prisma.user.upsert({
    where: { email: 'admin@turing.com' },
    update: {},
    create: {
      email: 'admin@turing.com',
      name: 'Admin Turing',
      password,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@turing.com' },
    update: {},
    create: {
      email: 'user@turing.com',
      name: 'Standard User',
      password,
      role: Role.USER,
    },
  });

  // Crear Categorías (Importante para los filtros del front)
  const cat1 = await prisma.category.upsert({
    where: { name: 'Laptops' },
    update: {},
    create: { name: 'Laptops' },
  });

  const cat2 = await prisma.category.upsert({
    where: { name: 'Monitores' },
    update: {},
    create: { name: 'Monitores' },
  });

  // Crear Activos de prueba
  await prisma.asset.createMany({
    data: [
      {
        name: 'MacBook Pro 16"',
        description: 'M2 Max, 32GB RAM',
        status: 'Disponible',
        categoryId: cat1.id,
        createdById: admin.id,
      },
      {
        name: 'Dell UltraSharp 27"',
        description: '4K USB-C Monitor',
        status: 'Asignado',
        categoryId: cat2.id,
        createdById: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log(' Seed finalizado: Datos de prueba listos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
