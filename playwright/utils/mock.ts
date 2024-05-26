const generateEmail = (prefix: string, domain: string) =>
  `${prefix}${crypto.randomUUID()}@${domain}`;

export const users = {
  onboarding: [
    {
      email: generateEmail("onboarding", "example.com"),
      password: "iHalLonErFGK$X901R0",
    },
    {
      email: generateEmail("onboarding", "example.com"),
      password: "231Xh7D&dM8u75EjIYV",
    },
  ],
};

console.log(users);
