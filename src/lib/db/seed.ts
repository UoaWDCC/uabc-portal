import { randomInt } from "crypto";
import { exit } from "process";
import { faker } from "@faker-js/faker";
import { addMonths, format } from "date-fns";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/lib/db/schema";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const db = drizzle(postgres(process.env.DATABASE_URL), { schema });

function formatDateString(date: Date) {
  return format(date, "yyyy-MM-dd");
}

async function main() {
  console.log("Seeding users...");

  const users: (typeof schema.users.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      id: crypto.randomUUID(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      member: faker.datatype.boolean(),
    });
  }

  await db.insert(schema.users).values(users);
  console.log("Seeded users.");

  console.log("Seeding semesters...");
  const semesters: (typeof schema.semesters.$inferInsert)[] = [];
  for (let i = 0; i < 2; i++) {
    const date = faker.date.anytime();
    semesters.push({
      id: randomInt(1000000),
      name: "Semester " + faker.string.alphanumeric(5),
      startDate: formatDateString(date),
      breakStart: formatDateString(addMonths(date, 1)),
      breakEnd: formatDateString(addMonths(date, 2)),
      endDate: formatDateString(addMonths(date, 3)),
      bookingOpenDay: "Monday",
      bookingOpenTime: "12:00:00",
    });
  }
  await db.insert(schema.semesters).values(semesters);
  console.log("Seeded semesters.");

  console.log("Seeding game session schedules...");
  const gameSessionSchedules: (typeof schema.gameSessionSchedules.$inferInsert)[] =
    [];
  for (const semester of semesters) {
    for (let j = 0; j < 4; j++) {
      gameSessionSchedules.push({
        semesterId: semester.id!,
        weekday: schema.weekdayEnum.enumValues[j],
        startTime: "12:00:00",
        endTime: "14:00:00",
        locationName: faker.company.name(),
        locationAddress: faker.location.streetAddress(),
        memberCapacity: 10,
        casualCapacity: 5,
      });
    }
  }
  await db.insert(schema.gameSessionSchedules).values(gameSessionSchedules);
  console.log("Seeded game session schedules.");

  console.log("Seeding game sessions...");
  const gameSessions: (typeof schema.gameSessions.$inferInsert)[] = [];

  const [bookingPeriod] = await db
    .insert(schema.bookingPeriods)
    .values({
      semesterId: semesters[0].id!,
      bookingOpenTime: faker.date.past(),
      bookingCloseTime: faker.date.future(),
    })
    .returning();

  for (let i = 0; i < 10; i++) {
    gameSessions.push({
      id: randomInt(1000000),
      date: formatDateString(
        faker.date.between({
          from: new Date("2020-01-01"),
          to: new Date("2025-12-31"),
        })
      ),
      startTime: "12:00:00",
      endTime: "14:00:00",
      locationName: faker.company.name(),
      locationAddress: faker.location.streetAddress(),
      memberCapacity: 10,
      casualCapacity: 5,
      bookingPeriodId: bookingPeriod.id,
    });
  }
  await db.insert(schema.gameSessions).values(gameSessions);

  console.log("Seeding bookings and booking details...");
  const bookings: (typeof schema.bookings.$inferInsert)[] = [];
  const bookingDetails: (typeof schema.bookingDetails.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    bookings.push({
      id: randomInt(1000000),
      userId: users[i].id,
      isMember: users[i].member!,
    });
  }
  await db.insert(schema.bookings).values(bookings);
  console.log("Seeded bookings.");

  for (let i = 0; i < bookings.length; i++) {
    const half = Math.floor(gameSessions.length / 2);
    for (let j = 0; j < 2 * half; j += half) {
      bookingDetails.push({
        bookingId: bookings[i].id!,
        gameSessionId: gameSessions[randomInt(j, j + half)].id!,
        playLevel: schema.playLevelEnum.enumValues[randomInt(3)],
      });
    }
  }
  await db.insert(schema.bookingDetails).values(bookingDetails);
  console.log("Seeded booking details.");

  console.log("Database seeding complete.");
  exit(0);
}

main();
