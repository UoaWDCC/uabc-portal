import { faker } from "@faker-js/faker";

export const generateMockOnboardingUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
