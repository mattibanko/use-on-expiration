import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  moduleDirectories: ['node_modules', 'src']
};

export default config;
