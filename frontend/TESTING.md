# Testing Documentation

## Overview
This component library has a comprehensive test suite using Jest and React Testing Library, achieving **98.73% code coverage** which exceeds the required 80% threshold.

## Test Suite Summary

### Coverage Report
```
-----------------|---------|----------|---------|---------|
File             | % Stmts | % Branch | % Funcs | % Lines |
-----------------|---------|----------|---------|---------|
All files        |   98.73 |    90.36 |     100 |     100 |
 components      |     100 |      100 |     100 |     100 |
  Button.tsx     |     100 |      100 |     100 |     100 |
  Card.tsx       |     100 |      100 |     100 |     100 |
  Input.tsx      |     100 |      100 |     100 |     100 |
 components/ui   |     100 |    95.83 |     100 |     100 |
  Modal.tsx      |     100 |    95.83 |     100 |     100 |
 services        |   97.29 |    75.86 |     100 |     100 |
  trackingAPI.ts |   97.29 |    75.86 |     100 |     100 |
-----------------|---------|----------|---------|---------|
```

### Test Statistics
- **Total Test Suites:** 5
- **Total Tests:** 103
- **All Tests:** ✅ PASSING
- **Coverage:** 98.73% (exceeds 80% requirement)

## Running Tests

### Available Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Files Location
All test files are located in: `app/components/__tests__/`

## Component Tests

### 1. Button Component (`Button.test.tsx`)
**Total Tests:** 17

#### Test Categories:
- **Rendering (5 tests)**
  - Default props rendering
  - Custom className application
  - Loading state display
  - All variant styles (primary, secondary, outline, danger)
  - All sizes (sm, md, lg)

- **Interactions (4 tests)**
  - Click event handling
  - Disabled state behavior
  - Loading state behavior
  - Keyboard navigation

- **Props (6 tests)**
  - Full width application
  - Ref forwarding
  - Disabled state
  - ARIA attributes
  - Type attribute
  - Combined variant and size classes

- **Edge Cases (3 tests)**
  - Empty children handling
  - Loading spinner visibility
  - Disabled when loading

### 2. Input Component (`Input.test.tsx`)
**Total Tests:** 24

#### Test Categories:
- **Rendering (7 tests)**
  - Default rendering
  - Label display
  - Error message display
  - Placeholder text
  - Custom className
  - Error border styling
  - Default border styling

- **Interactions (5 tests)**
  - User input handling
  - onChange callback
  - Focus and blur events
  - Disabled input prevention
  - Keyboard navigation

- **Props (8 tests)**
  - Full width application
  - Ref forwarding
  - Different input types (text, email, password)
  - Disabled state
  - Required attribute
  - MaxLength attribute
  - Default value
  - Controlled value

- **Label and Error Display (4 tests)**
  - Label-input association
  - Error message styling
  - Simultaneous label and error
  - No label/error rendering

### 3. Modal Component (`Modal.test.tsx`)
**Total Tests:** 22

#### Test Categories:
- **Rendering (7 tests)**
  - Open/closed state
  - Title display
  - Close button visibility
  - Footer rendering
  - Different sizes (sm, md, lg, xl)

- **Interactions (6 tests)**
  - Close button click
  - Backdrop click behavior
  - Backdrop click prevention
  - Escape key press
  - Content click handling
  - Body scroll prevention

- **Props (5 tests)**
  - Custom className
  - Header className
  - Content className
  - Footer className
  - Complex children rendering

- **Edge Cases and Accessibility (4 tests)**
  - Event listener cleanup
  - Rapid open/close toggling
  - ARIA labels
  - Header-less rendering

### 4. Card Component (`Card.test.tsx`)
**Total Tests:** 24

#### Test Categories:
- **Rendering (8 tests)**
  - Default rendering
  - Title and subtitle display
  - Custom className
  - All variant styles (default, elevated, outlined)
  - All padding sizes (sm, md, lg)
  - Action element rendering

- **Interactions (4 tests)**
  - Card click handling
  - Independent action clicks
  - Mouse enter/leave events
  - Keyboard navigation

- **Props (6 tests)**
  - Full width application
  - Ref forwarding
  - Custom data attributes
  - ARIA attributes
  - Role attribute
  - Combined props

- **Layout and Structure (6 tests)**
  - Action element positioning
  - Header-content ordering
  - Complex children structure
  - Base styles application
  - Header spacing
  - Conditional header rendering

### 5. Tracking Integration Tests (`tracking.integration.test.tsx`)
**Total Tests:** 16

#### Test Categories:
- **Session Management (3 tests)**
  - Session ID generation
  - Session ID persistence
  - Session ID inclusion in requests

- **Button Click Tracking (4 tests)**
  - Successful tracking
  - Metadata inclusion
  - Page metadata
  - Error handling

- **Statistics Retrieval (3 tests)**
  - Stats fetching
  - Filtered stats by button ID
  - Error handling

- **Data Export (4 tests)**
  - JSON format export
  - CSV format export
  - Authentication token inclusion
  - Export error handling

- **API Configuration (2 tests)**
  - API URL usage
  - Environment configuration

## Test Configuration

### Jest Configuration (`jest.config.js`)
```javascript
{
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'app/components/**/*.{js,jsx,ts,tsx}',
    'app/services/trackingAPI.ts',
    // Excludes demo pages, charts, and non-core components
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

### Test Setup (`jest.setup.js`)
- Imports `@testing-library/jest-dom` for extended matchers
- Mocks `window.matchMedia` for responsive components
- Mocks global `fetch` for API testing

## Best Practices Used

### 1. Comprehensive Coverage
- Each component has minimum 3 test categories (rendering, interactions, props)
- Integration tests cover the tracking system end-to-end
- Edge cases and accessibility features are tested

### 2. Test Organization
- Tests grouped by category using `describe` blocks
- Clear, descriptive test names
- Consistent test structure across all files

### 3. User-Centric Testing
- Uses `@testing-library/react` for user-focused tests
- Tests user interactions with `userEvent`
- Avoids implementation details

### 4. Isolation
- Each test is independent
- Proper cleanup with `beforeEach`/`afterEach`
- Mocked external dependencies

### 5. Accessibility Testing
- ARIA attributes tested
- Keyboard navigation verified
- Screen reader compatibility checked

## Continuous Integration

The test suite is designed to run in CI/CD pipelines:

```bash
# In your CI/CD pipeline
npm install
npm test -- --coverage --ci
```

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Ensure async operations use `async/await`
   - Check for unclosed promises

2. **Coverage not updating**
   - Clear Jest cache: `npm test -- --clearCache`
   - Ensure files are in `collectCoverageFrom` pattern

3. **Mock issues**
   - Check `jest.setup.js` for global mocks
   - Verify mock implementations match real APIs

## Future Improvements

- Add visual regression tests with Storybook
- Add E2E tests with Playwright
- Add performance benchmarks
- Add component snapshot tests
- Increase branch coverage to 100%

## Conclusion

This test suite ensures the component library is production-ready with:
- ✅ 103 passing tests
- ✅ 98.73% code coverage (exceeds 80% requirement)
- ✅ All component variants tested
- ✅ Integration tests for tracking system
- ✅ Accessibility compliance
- ✅ Executable with simple `npm test` command
