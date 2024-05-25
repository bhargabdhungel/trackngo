import {
  PrismaClient,
  BusDocumentType,
  DriverDocumentType,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createSampleData() {
  const totalUsers = 5;
  console.log("Starting to create sample data...");

  // Calculate total number of trips to be created for progress tracking
  let totalTrips = 0;
  const userBuses = Array.from({ length: totalUsers }, () =>
    faker.number.int({ min: 3, max: 5 })
  );
  const busTrips = userBuses.map((busCount) =>
    Array.from({ length: busCount }, () => faker.number.int({ min: 4, max: 5 }))
  );
  busTrips.forEach((tripsPerBusArray) =>
    tripsPerBusArray.forEach((tripsCount) => (totalTrips += tripsCount))
  );

  let tripsCreated = 0;

  for (let i = 0; i < totalUsers; i++) {
    const userEmail = faker.internet.email();
    const userName = faker.person.fullName();
    const numBuses = userBuses[i];

    try {
      await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
          role: "USER",
          buses: {
            create: Array.from({ length: numBuses }, (_, busIndex) => {
              const numTrips = busTrips[i][busIndex];
              return {
                name: faker.string.alphanumeric(10),
                documents: {
                  create: Object.values(BusDocumentType).map((type) => ({
                    type,
                    link: faker.internet.url(),
                    expiryDate: faker.date.future(),
                  })),
                },
                trips: {
                  create: Array.from({ length: numTrips }, (_, tripIndex) => {
                    tripsCreated++;
                    const percentComplete = (
                      (tripsCreated / totalTrips) *
                      100
                    ).toFixed(2);
                    console.log(
                      `Creating trip ${tripIndex + 1}/${numTrips} for bus ${
                        busIndex + 1
                      }/${numBuses} of user ${
                        i + 1
                      }. Progress: ${percentComplete}% complete.`
                    );
                    return {
                      routeFrom: faker.location.city(),
                      routeTo: faker.location.city(),
                      startTime: faker.date.future(),
                      endTime: faker.date.future(),
                      fare: faker.number.int({ min: 100, max: 1000 }),
                      maintenanceCost: faker.number.int({ min: 50, max: 500 }),
                      driver: {
                        create: {
                          name: faker.person.fullName(),
                          documents: {
                            create: Object.values(DriverDocumentType).map(
                              (type) => ({
                                type,
                                link: faker.internet.url(),
                              })
                            ),
                          },
                        },
                      },
                    };
                  }),
                },
              };
            }),
          },
        },
      });
    } catch (error) {
      console.error(`Error creating data for user ${i + 1}: ${error}`);
    }
  }

  console.log("Data has been successfully populated.");
}

createSampleData()
  .catch((error) => {
    console.error("Error populating data:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
