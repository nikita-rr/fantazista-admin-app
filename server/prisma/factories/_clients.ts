import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const createClient = async (prisma: PrismaClient) => {
  const tax_statuses = ['Самозанятый', 'ИП', 'ООО'];
  const creator = await prisma.user.findFirst();
  if (creator) {
    await prisma.client.create({
      data: {
        creatorId: creator.id,
        created_at: new Date(),
        f: faker.person.lastName(),
        i: faker.person.firstName(),
        o: faker.person.middleName(),
        tax_status: tax_statuses[Math.floor(Math.random() * tax_statuses.length)],
        inn: faker.string.numeric({ length: 10 }),
        ogrn: faker.string.numeric({ length: 15 }),
      },
    });
  }
};
