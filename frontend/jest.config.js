const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/components/**/*.{js,jsx,ts,tsx}',
    'app/services/trackingAPI.ts',
    '!app/components/**/*.d.ts',
    '!app/components/**/index.ts',
    '!app/components/**/__tests__/**',
    '!app/components/**/page.tsx',
    '!app/components/ui/button/page.tsx',
    '!app/components/ui/card/page.tsx',
    '!app/components/ui/input/page.tsx',
    '!app/components/ui/modal/page.tsx',
    '!app/components/charts/**',
    '!app/components/AnimatedBackground.tsx',
    '!app/components/AppBar.tsx',
    '!app/components/Footer.tsx',
    '!app/components/LoginForm.tsx',
    '!app/components/RegisterForm.tsx',
    '!app/components/UserProfile.tsx',
    '!app/components/ProductCard.tsx',
    '!app/components/AddToCart.tsx',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
