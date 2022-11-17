import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.softwaresOnRooms.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.software.deleteMany({});

  const masterType: string[] = ['General', 'Mulmed', 'HighSpec'];
  let rooms: string[] = [];

  for (let idx = 0; idx < 31; idx++) {
    const roomNumber = `${600 + idx}`;
    const room = await prisma.room.create({
      data: {
        roomNumber,
      },
    });
    rooms.push(room.id);
  }

  for (let idx = 0; idx < 100; idx++) {
    const productName = faker.commerce.product();
    const isLicense = faker.datatype.boolean();
    await prisma.software.create({
      data: {
        currentLicense: `${productName}.license.net`,
        installerPath: `\\\\smb.server\\softwares\\random\\${productName}`,
        license: String(isLicense),
        numberOfLicense: !isLicense
          ? 0
          : faker.datatype.number({
              max: 100,
              min: 1,
            }),
        softwareName: productName,
        version: String(
          faker.datatype.number({
            min: 10,
            max: 100,
            precision: 0.01,
          }),
        ),
        group: faker.helpers.arrayElement(masterType),
        note: faker.lorem.sentence(),
        rooms: {
          create: [
            ...faker.helpers.arrayElements(
              rooms.map((room) => <{ roomId }>{ roomId: room }),
              faker.datatype.number({
                min: 1,
                max: 3,
              }),
            ),
          ],
        },
      },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect;
    process.exit(1);
  });
