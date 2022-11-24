import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.softwaresOnRooms.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.software.deleteMany({});
  await prisma.semester.deleteMany({});
  await prisma.master.deleteMany({});

  const semesters = ['2019/2020', '2020/2021', '2021/2022', '2022/2023'];
  const masterTypes = ['General', 'Mulmed', 'HighSpec', 'Jaringan', 'Mac'];

  const semesterId: string[] = [];
  const masterTypesId: string[] = [];
  let rooms: string[] = [];

  for (let idx = 0; idx < masterTypes.length; idx++) {
    const masterName = masterTypes[idx];
    const { id } = await prisma.master.create({
      data: {
        masterName,
      },
    });
    masterTypesId.push(id);
  }

  for (let idx = 0; idx < semesters.length; idx++) {
    const semesterName = semesters[idx];
    const { id } = await prisma.semester.create({
      data: {
        semesterName,
        isActive: idx === 3 ? true : false,
      },
    });
    semesterId.push(id);
  }

  for (let idx = 0; idx < 31; idx++) {
    const roomNumber = `${600 + idx}`;
    const room = await prisma.room.create({
      data: {
        roomNumber: roomNumber,
        masterId: faker.helpers.arrayElement(masterTypesId),
      },
    });
    rooms.push(room.id);
  }

  for (let semesterIdx = 0; semesterIdx < semesterId.length; semesterIdx++) {
    const semesterIdElement = semesterId[semesterIdx];

    for (let idx = 0; idx < 100; idx++) {
      const productName = faker.commerce.product();
      const isLicense = faker.datatype.boolean();
      await prisma.software.create({
        data: {
          semesterId: semesterIdElement,
          masters: {
            connect: [
              ...faker.helpers
                .arrayElements(masterTypesId)
                .map<{ id: string }>((id) => ({ id })),
            ],
          },
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
          group: faker.helpers.arrayElement(masterTypes),
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
