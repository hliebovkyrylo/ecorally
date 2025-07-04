export const projects = [
  {
    displayName: "web",
    testMatch: ["<rootDir>/apps/next-app/**/*.(spec|test).(ts|tsx|js)"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
  },
  {
    displayName: "api",
    testMatch: ["<rootDir>/apps/nest-app/**/*.(spec|test).(ts|js)"],
    preset: "ts-jest",
    testEnvironment: "node",
  },
];
