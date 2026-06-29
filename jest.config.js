/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: { esModuleInterop: true, module: 'commonjs', target: 'es2020' } }],
  },
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    'src/app/api/**/route.ts',
    '!**/*.d.ts',
  ],
};
