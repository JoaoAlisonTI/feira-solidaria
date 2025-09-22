const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');
  const categorias = [
    { nome: 'Roupas' },
    { nome: 'Calçados' },
    { nome: 'Alimentos' },
    { nome: 'Brinquedos' },
    { nome: 'Livros' },
    { nome: 'Móveis' },
    { nome: 'Eletrônicos' },
    { nome: 'Outros' },
  ];

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nome: categoria.nome },
      update: {},
      create: categoria,
    });
  }
  console.log('Seeding concluído.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });