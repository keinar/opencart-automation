
# Demo - OpenCart Automation with Playwright

This project, demonstrates automated testing for OpenCart using Microsoft's Playwright. It provides a suite of automated tests designed to validate the functionality and performance of an OpenCart installation.


# Introduction

The OpenCart Automation project leverages Playwright, a powerful browser automation tool, to simulate user interactions and test various aspects of the OpenCart e-commerce platform. This approach ensures that all critical pathways, such as user registration, product search, cart management, and checkout processes, work as intended.

# Installation

Before you can run these automated tests, you'll need to set up your environment. Here's how to get started:

Prerequisites
Node.js (LTS version recommended)
An existing OpenCart installation for testing

## Structure

- **.github/workflows**: Contains GitHub action workflows.
- **helpers**: Contains helper functions and utilities.
- **pages**: Includes page objects and related functionalities.
- **tests**: Includes the main test scripts.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/keinar/opencart-automation.git
   ```

2. Navigate to the project directory:
   ```bash
   cd opencart-automation
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the tests:
   ```bash
   npx playwright test
   ```
