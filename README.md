# OpenCart Automation with Playwright

## Introduction

This project demonstrates automated testing for OpenCart using Microsoft's Playwright. It provides a comprehensive suite of automated tests designed to validate the functionality and performance of an OpenCart installation. Leveraging Playwright, a powerful browser automation tool, the project simulates user interactions to test various aspects of the OpenCart e-commerce platform. This ensures that critical pathways, such as user registration, product search, cart management, and checkout processes, work as intended.

## Features

- **Comprehensive Testing**: Covers all critical aspects of the OpenCart platform, ensuring a thorough validation of functionalities.
- **Automated User Simulations**: Utilizes Playwright to simulate real user interactions with the website.
- **Continuous Integration Support**: Includes GitHub action workflows for integrating testing into CI/CD pipelines.
- **Dynamic Data Generation**: Uses Faker to generate realistic but fake data for testing purposes.
- **Environment Configuration**: Leverages dotenv for managing environment variables, making it easy to configure the testing environment without hard-coding sensitive information.
- **Detailed Test Reporting**: Implements Allure Report for generating detailed and visually appealing test reports.
- **Report Deployment**: Automates the deployment of Allure test reports to GitHub Pages, providing easy access to test results.

## Technologies Used

- **Playwright**: For browser automation and simulating user interactions.
- **Faker**: To generate fake data for use in tests, ensuring a wide range of test scenarios.
- **dotenv**: For managing environment variables, allowing for flexible configuration of the testing environment.
- **Allure Report**: For generating detailed and visually appealing test reports.
- **GitHub Pages**: For hosting and sharing Allure test reports, making them accessible to team members and stakeholders.

## Installation

### Prerequisites

- Node.js (LTS version recommended)
- An existing OpenCart installation for testing purposes

### Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/keinar/opencart-automation.git
   ```

   2. Navigate to the project directory:
```
cd opencart-automation
```
3. Install the dependencies:
```
npm install
```
4. Configure your environment variables in a `.env` file based on the provided `.env.example`.
5. Run the tests:
```
npx playwright test
```
6. Generate the Allure report:
```
npm run allure:generate
```

7. Open the Allure report:
```
npm run allure:open
```

8. Deploy the Allure report to GitHub Pages:
- Commit and push your tests and automatically deploy the reports upon test completion on CI.
- open this like to see the allure report results: https://keinar.github.io/opencart-automation/

## Running Tests locally
To run your tests locally, you can use several different commands depending on which browser you wish to test with or if you want to run tests sequentially across multiple browsers.

## Running Tests in Chromium (Chrome)
To run tests specifically in Chromium (Chrome), use the following command:

```
npm run test:chromium
```

This command utilizes Playwright to execute tests in a Chromium browser environment, allowing you to test Chrome-specific behaviors.

## Running Tests in Firefox
To run tests specifically in Firefox, use the following command:

```
npm run test:firefox
```

This command tells Playwright to execute your test suite in Firefox, enabling you to validate Firefox-specific functionalities.

## Running Tests Sequentially Across Browsers
If you wish to run your tests sequentially across both Chromium and Firefox to ensure cross-browser compatibility, use the following command:

```
npm run test:sequential
```
This command first runs all tests in Chromium and, upon completion, runs them again in Firefox. It's a comprehensive way to validate your OpenCart installation's behavior across these two major browsers.

## Generating and Viewing Test Reports
After running your tests, generate and view detailed test reports using Allure with the above commands in steps  6-7
These reports provide a detailed overview of your tests, including which tests passed, failed, and any associated screenshots or logs for debugging purposes.

## Project Structure

- **.github/workflows**: Contains GitHub action workflows for CI/CD integration and deploying reports to GitHub Pages.
- **helpers**: Contains helper functions and utilities to support testing.
- **pages**: Includes page objects and related functionalities for more structured and maintainable tests.
- **tests**: Houses the main test scripts that execute the automated tests.

## About

This project aims to provide an automation framework for testing OpenCart demo websites, ensuring that developers and testers can easily validate the functionality and performance of their OpenCart installations.
