import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  // Crear Roles
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

  // Crear Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@turing.com' },
    update: {},
    create: {
      email: 'admin@turing.com',
      name: 'Admin Turing',
      password,
      roleId: adminRole.id,
    },
  });

  // Crear Categoría (Antes Proyecto)
  const category = await prisma.category.upsert({
    where: { name: 'Laptops' },
    update: {},
    create: {
      name: 'Laptops',
      description: 'Equipos portátiles para desarrollo',
      userId: admin.id,
    },
  });

  // Crear Producto (Antes Material)
  await prisma.product.create({
    data: {
      name: 'MacBook Pro M3',
      description: '16GB RAM, 512GB SSD, Space Gray',
      status: 'Disponible',
      categoryId: category.id,
    },
  });

  console.log('Seed finalizado con éxito: Categorías y Productos listos');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
