# TFNR-TEST-AUTOMATION

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Useful Commands](#useful-commands)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Introduction

This repository contains a Playwright-based test automation framework designed for end-to-end (E2E) testing of TFN Registry and UPP.

## Prerequisites

Download and install latest stable Node.js, suggested is LTS and not current 
Visual Studio Code is suggested IDE

## Installation

Clone the repo and run below two commands:
npm install
npx playwright install

Additionally nice to have:
Playwright Test for VSCode                        # extenstion by Microsoft

## Project Structure

├── .auth/                # storageState is part of gitignore will populated after your local runs
├── fixtures/             # Test fixtures & test data
├── pom/                  # Page Object Model classes
├── tests/                # Test files
├── utils/                # utility files
├── .env.example          # Environment variable examples
├── .gitignore            # gitigore
├── package.json          # Project metadata & scripts
├── playwright.config.ts  # Playwright configuration
└── README.md             # This file

## Configuration

create .env file locally by copying .env.example and replace it with valid credentials

## Best Practices

Follow TypeScript naming conventions, which use camelCase for variable names (e.g., effectiveDate).

For selectors, prioritize clarity and descriptiveness over brevity. Use specific names with consistent postfixes, such as effectiveDateInput or submitButton.
Refer to cad.po.ts and cad.actions.ts for examples.

More to be added...

## Useful Commands

npx playwright test --project=projectName --grep @tagName                    #runs in headless mode by default, filters by projectName and tagName
npx playwright show-report                                                   #view the last execution report and traces
npx playwright test --project=projectName --grep @tagName --ui               # runs in UI runner
npx playwright test --project=projectName --grep @tagName --debug            #runs in debug mode
npx playwright test --project=projectName --grep @tagName                    #runs in headless by mode by default
npx playwright test --project=projectName --grep @tagName --repeat-each 7    #repeat each is useful to identify flaky tests
npx playwright codegen <url>                                                 #generates code for the actions you have done in playground

## Contributing

Contributions are welcome! Please:
Create a feature branch
Submit a pull request

## Contact

For questions or support, contact:
Team Slack: #strikers-testing-team